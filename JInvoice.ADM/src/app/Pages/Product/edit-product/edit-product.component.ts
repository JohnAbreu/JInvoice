import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service/authentication.service';
import { HttpService } from 'app/httpServices/http.service';
import { APIResponse } from 'app/models/ApiResponse/ApiResponse.model';
import { Category } from 'app/models/Catalog/category.model';
import { Product } from 'app/models/Catalog/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  private userLog = "";
  public imagePath ="";
  public product:Product;
  public Categories: Category[];
  public productDetailsForm: UntypedFormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public Required: boolean =false;

  constructor(private queryString: ActivatedRoute, 
    private router: Router,
    private http: HttpService,
    private authUser: AuthenticationService,
    private formBuilder: UntypedFormBuilder) {
   }
  ngOnInit(): void {
    this.loadCategories();
    this.queryString.params.subscribe(({id}) => {
      this.http.Get<APIResponse<Product>>('products',id).subscribe(
        (resp)=> { 
          this.product = resp.result;
          console.log('Objeto product:', this.product);
          this.getModelDataToForm(this.product);
          console.log(' sets propiedades:', this.productDetailsForm);
        }
        )});
      this.productDetailsForm = this.formBuilder.group({
        productID:[''],
        name: ['',Validators.required],
        selectCategory: ['', Validators.required],
        description: [''],
        createdOn:[new Date],
        onHand: [false],
        price: [0.00]
      });
  }
 getModelDataToForm(product: Product){
    this.productDetailsForm.controls['productID'].setValue(this.product.productID); 
    this.productDetailsForm.controls['selectCategory'].setValue(this.product.categoryID); 
    this.productDetailsForm.controls['name'].setValue(this.product.name); 
    this.productDetailsForm.controls['description'].setValue(this.product.description); 
    this.productDetailsForm.controls['createdOn'].setValue(this.product.createdOn);
    if(this.product.onHand === 1) this.productDetailsForm.controls['onHand'].setValue(true); 
    else this.productDetailsForm.controls['onHand'].setValue(false);
    this.productDetailsForm.controls['price'].setValue(this.product.price); 
  } 
  loadCategories() {
    this.http.loadPararms();
    this.http.GetAll<APIResponse<Category[]>>('category')
    .subscribe((resp) => {
      this.Categories = resp.result;
    },
    (error) => console.log(error));
  }
  setFormDataToModel(){
    this.product.name = this.productDetailsForm.controls['name'].value; 
    this.product.categoryID = this.productDetailsForm.controls['selectCategory'].value; 
    this.product.description = this.productDetailsForm.controls['description'].value; 
     if(this.productDetailsForm.controls['onHand'].value == true) this.product.onHand = 1;
     else this.product.onHand = 0;
    this.product.price = this.productDetailsForm.controls['price'].value; 
    this.authUser.currentUser.subscribe( ({userID}) => this.userLog = userID);
    this.product.createdBy = this.userLog;
    console.log(`obtejo productos`, this.product)
  }
  onFileSelected(event:any) {
    const file = event.target.files[0];
    this.imagePath =file;
    console.log(this.imagePath);
  }
  OnSubmitForm() {
    this.isSubmitted = true;
    this.loading = true;
    if (this.productDetailsForm.invalid) {
      this.Required =true;
      return;
    }else this.Required =false;
    this.setFormDataToModel();

    this.http.Put('products', this.product)
      .subscribe((resp) => {
        console.log(resp);
        this.loading = false;
        this.router.navigate(['/Products']);
      },
      (error) => console.log(error));
    }
    OnDelete(){
      this.loading = true;
      let productId = this.productDetailsForm.controls['productID'].value; 
      this.http.Delete('products', productId)
      .subscribe((resp) => {
        this.loading = false;
        this.router.navigate(['/Products']);
      },
      (error) => console.log(error))

    }
}
