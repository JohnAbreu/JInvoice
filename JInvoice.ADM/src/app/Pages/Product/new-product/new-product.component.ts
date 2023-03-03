import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service';
import { HttpService } from 'app/httpServices/http.service';
import { APIResponse } from 'app/models/ApiResponse/ApiResponse.model';
import { Category } from 'app/models/Catalog/category.model';
import { Product } from 'app/models/Catalog/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  private userLog = "";
  public imagePath ="";
  public product:Product;
  public Categories: Category[];
  public productDetailsForm: UntypedFormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;

  constructor(private router: Router,
    private http: HttpService, 
    private authUser: AuthenticationService,
    private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.loadCategories();
    this.newProduct(this.product);
    this.authUser.currentUser.subscribe( ({userID}) => this.userLog = userID)
    this.productDetailsForm = this.formBuilder.group({
      name: ['',Validators.required],
      categoryID: [0, Validators.required],
      description: [''],
      onHand: [false],
      price: [0.00]
    });
  }

  loadCategories() {
    this.http.GetAll<APIResponse<Category[]>>('category')
    .subscribe((resp) => {
      this.Categories = resp.result;
    });
  }

  newProduct(product : Product):Product{
   return product =  {
    productID :0,
    categoryID:0,
    name:'',
    description: '',
    price:0.00,
    createdBy: this.userLog,
    isActive: true,
    createdOn: new Date,
    onHand:0,
    }
  }
  public get getProductFormData() {
    return this.productDetailsForm.controls;
  }
  setFormDataToModel(){
    this.product.name = this.productDetailsForm.controls['name'].value; 
    this.product.categoryID = this.productDetailsForm.controls['categoryID'].value; 
    this.product.description = this.productDetailsForm.controls['description'].value; 
    this.product.onHand = this.productDetailsForm.controls['onHand'].value; 
    this.product.price = this.productDetailsForm.controls['price'].value; 
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
      return;
    }
    this.setFormDataToModel();

    this.http.Post('products', this.product)
      .subscribe((resp) => {
        console.log(resp);
        this.loading = false;
        this.router.navigate(['/Products']);
      });
    }

}
