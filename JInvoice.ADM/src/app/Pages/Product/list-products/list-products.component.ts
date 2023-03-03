import { Component, OnInit } from '@angular/core';
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

  public collectionSize = 0;
  public positionPage = 1;
  public pageSizes = 3;
  public takePage = 10;
  public skipPage = 0

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadData();
  }

  loadCategories() {
    this.http.GetAll<APIResponse<Category[]>>('category')
    .subscribe((resp) => {
      this.Categories = resp.result;
    });
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
    this.loadData(this.termino,this.selectedCat);
  }

}
