import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service/authentication.service';
import { HttpService } from 'app/httpServices/http.service';
import { Category } from 'app/models/Catalog/category.model';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  private userLog = "";
  public imagePath ="";
  public category:Category;
  public categoryDetailsForm: UntypedFormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public Required: boolean =false;

  constructor(private router: Router,
    private http: HttpService, 
    private authUser: AuthenticationService,
    private route: Router,
    private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    if(this.authUser.isAuthenticated === false) this.route.navigate(['/login']);
    this.category = this.newCategory(this.category);
    this.categoryDetailsForm = this.formBuilder.group({
      name: ['',Validators.required],
      description: [''],
    });
  }

  newCategory(category : Category): Category{
   return category =  {
    categoryID:0,
    name:'',
    description: '',
    createdBy: this.userLog,
    isActive: true,
    createdOn: new Date,
    }
  }
  public get getCategoryFormData() {
    return this.categoryDetailsForm.controls;
  }
  setFormDataToModel(){
    this.category.name = this.categoryDetailsForm.controls['name'].value; 
    this.category.description = this.categoryDetailsForm.controls['description'].value; 
    //this.authUser.currentUser.subscribe( ({userID}) => this.userLog = userID);
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.category.createdBy = user.userID;
    console.log(`obtejo productos`, this.category)
  }
  onFileSelected(event:any) {
    const file = event.target.files[0];
    this.imagePath =file;
    console.log(this.imagePath);
  }
  OnSubmitForm() {
    this.isSubmitted = true;
    this.loading = true;
    if (this.categoryDetailsForm.invalid) {
      this.Required =true;
      return;
    }else this.Required =false;
    this.setFormDataToModel();

    this.http.Post('category', this.category)
      .subscribe((resp) => {
        console.log(resp);
        this.loading = false;
        this.router.navigate(['/Categories']);
      },
      (error) => console.log(error)
      );
    }
}
