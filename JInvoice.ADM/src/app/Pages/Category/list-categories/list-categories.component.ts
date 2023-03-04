import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { HttpService } from 'app/httpServices/http.service';
import { APIResponse } from 'app/models/ApiResponse/ApiResponse.model';
import { Category } from 'app/models/Catalog/category.model';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  public Categories: Category[];
  public termino : string ="";
  public filterDetailsForm: UntypedFormGroup;

  public collectionSize = 0;
  public positionPage = 1;
  public pageSizes = 3;
  public takePage = 10;
  public skipPage = 0

  constructor(private http: HttpService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.loadData();
    this.filterDetailsForm = this.formBuilder.group({
      name: ['']
    });
  }

  loadData(name: string = '',categoryId:number = 0, active: boolean = true) {
    this.http.loadPararms(name, categoryId, active, this.skipPage, this.takePage, 0);
    this.http.GetAll<APIResponse<Category[]>>('category')
    .subscribe((resp) => {
      this.Categories = resp.result;
      this.collectionSize = resp.paginator.totalRecords;
      this.skipPage = resp.paginator.skipRecords;
      this.takePage = resp.paginator.takeRecords;      
    },
    (error) => console.log(error));
  }
 
  onChanges(position)
  {
    this.skipPage = this.takePage * (position -1);
    this.loadData(this.termino);
  }
  filter(){
    let name = this.filterDetailsForm.controls['name'].value; 
    this.loadData(name);
  }
}
