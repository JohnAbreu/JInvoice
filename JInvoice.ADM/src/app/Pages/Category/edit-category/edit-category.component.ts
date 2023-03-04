import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service/authentication.service';
import { HttpService } from 'app/httpServices/http.service';
import { APIResponse } from 'app/models/ApiResponse/ApiResponse.model';
import { Category } from 'app/models/Catalog/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  
  private userLog = "";
  public imagePath ="";
  public category: Category;
  public categoryDetailsForm: UntypedFormGroup;
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
    this.queryString.params.subscribe(({id}) => {
      this.http.Get<APIResponse<Category>>('category',id).subscribe(
        (resp)=> { 
          this.category = resp.result;
          console.log('Objeto product:', this.category);
          this.getModelDataToForm(this.category);
          console.log('sets propiedades:', this.categoryDetailsForm);
        }
        )});
      this.categoryDetailsForm = this.formBuilder.group({
        categoryID:[''],
        name: ['',Validators.required],
        description: [''],
        createdOn:[new Date],
      });
  }
 getModelDataToForm(category: Category){
    this.categoryDetailsForm.controls['categoryID'].setValue(this.category.categoryID); 
    this.categoryDetailsForm.controls['name'].setValue(this.category.name); 
    this.categoryDetailsForm.controls['description'].setValue(this.category.description); 
    this.categoryDetailsForm.controls['createdOn'].setValue(this.category.createdOn);
  } 
  setFormDataToModel(){
    this.category.name = this.categoryDetailsForm.controls['name'].value; 
    this.category.description = this.categoryDetailsForm.controls['description'].value; 
    this.authUser.currentUser.subscribe( ({userID}) => this.userLog = userID);
    this.category.createdBy = this.userLog;
    console.log(`obtejo productos`, this.category)
  }
  OnSubmitForm() {
    this.isSubmitted = true;
    this.loading = true;
    if (this.categoryDetailsForm.invalid) {
      this.Required =true;
      return;
    }else this.Required =false;
    this.setFormDataToModel();

    this.http.Put('category', this.category)
      .subscribe((resp) => {
        console.log(resp);
        this.loading = false;
        this.router.navigate(['/Categories']);
      },
      (error) => console.log(error));
    }
    OnDelete(){
      this.loading = true;
      let cagoryId = this.categoryDetailsForm.controls['categoryID'].value; 
      this.http.Delete('category', cagoryId)
      .subscribe((resp) => {
        this.loading = false;
        this.router.navigate(['/Categories']);
      },
      (error) => console.log(error))
    }
}
