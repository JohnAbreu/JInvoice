import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service';
import { HttpService } from 'app/httpServices/http.service';
import { APIResponse } from 'app/models/ApiResponse/ApiResponse.model';
import { Category } from 'app/models/Catalog/category.model';
import { Product } from 'app/models/Catalog/product.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  
  
  public Categories: Category[];
  public Products: Product[];
  public selectedCat : number = 0;
  public termino : string ="";
  public filterDetailsForm: UntypedFormGroup;

  public collectionSize = 0;
  public positionPage = 1;
  public pageSizes = 3;
  public takePage = 10;
  public skipPage = 0

  constructor(private http: HttpService, 
    private formBuilder: UntypedFormBuilder,
    private authUser : AuthenticationService,
    private route: Router) { }

  ngOnInit(): void {
    if(this.authUser.isAuthenticated === false) this.route.navigate(['/login']);
    this.loadCategories();
    this.loadData();
    this.filterDetailsForm = this.formBuilder.group({
      name: [''],
      selectCategory: ['']
    });
  }

  loadCategories() {
    this.http.loadPararms();
    this.http.GetAll<APIResponse<Category[]>>('category')
    .subscribe((resp) => {
      this.Categories = resp.result;
    },
    (error) => console.log(error));
  }

  loadData(name: string = '',categoryId:number = 0, active: boolean = true) {
    this.http.loadPararms(name, categoryId, active, this.skipPage, this.takePage, 0);
    this.http.GetAll<APIResponse<Product[]>>('products')
                 .subscribe((resp) => {
                  this.Products = resp.result;
                  this.collectionSize = resp.paginator.totalRecords;
                  this.skipPage = resp.paginator.skipRecords;
                  this.takePage = resp.paginator.takeRecords;
                });
  }
 
  onChanges(position)
  {
    this.skipPage = this.takePage * (position -1);
    this.filter();
  }
  filter(){
    let name = this.filterDetailsForm.controls['name'].value; 
    let categoryID = this.filterDetailsForm.controls['selectCategory'].value;
    console.log(`filtros para la busqueda: ${name} , ${categoryID}`)
    this.loadData(name, categoryID);
  }
}
