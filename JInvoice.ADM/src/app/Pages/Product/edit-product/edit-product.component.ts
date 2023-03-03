import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  public imagePath ="";
  public product:Product;
  public Categories: Category[];
  public productDetailsForm: UntypedFormGroup;

  public loading: boolean = false;
  public isSubmitted: boolean = false;

  constructor(private queryString: ActivatedRoute, 
    private router: Router,
    private http: HttpService,
    private formBuilder: UntypedFormBuilder) {
   }
  ngOnInit(): void {
    this.queryString.params.subscribe(({id}) => {
      this.http.Get<Product>('products',id).subscribe(
        (resp)=> { this.product = resp}
        )});
      this.productDetailsForm = this.formBuilder.group({
        name: ['',Validators.required],
        categoryID: [0, Validators.required],
        description: [''],
        onHand: [false],
        price: [0.00]
      });
  }
 get getModelDataToForm(){
    this.productDetailsForm.controls['productID'].setValue(this.product.productID); 
    this.productDetailsForm.controls['categoryID'].setValue(this.product.categoryID); 
    this.productDetailsForm.controls['name'].setValue(this.product.name); 
    this.productDetailsForm.controls['description'].setValue(this.product.description); 
    this.productDetailsForm.controls['createdOn'].setValue(this.product.createdOn); 
    this.productDetailsForm.controls['onHand'].setValue(this.product.onHand); 
    this.productDetailsForm.controls['price'].setValue(this.product.price); 
    return this.productDetailsForm;
  } 
  loadCategories() {
    this.http.GetAll<APIResponse<Category[]>>('category')
    .subscribe((resp) => {
      this.Categories = resp.result;
    });
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

    this.http.Put('products', this.product)
      .subscribe((resp) => {
        console.log(resp);
        this.loading = false;
        this.router.navigate(['/Products']);
      });
    }
    OnDelete(){
      this.loading = true;
      let productId = this.productDetailsForm.controls['productID'].value; 
      this.http.Delete('products', productId)
      .subscribe((resp) => {
        this.loading = false;
        this.router.navigate(['/Products']);
      })

    }
}
