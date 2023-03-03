import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'app/httpServices/http.service';
import { UserModel } from 'app/models/userModel';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {
  
  userForm: FormGroup;

  public user: UserModel;
  public userDetailsForm: UntypedFormGroup;
  public hasError: boolean = false;
  public loading: boolean = false;
  public confimrPass: string ="";
  public isSubmitted: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder,
    private http: HttpService, private router: Router) { }
    
  ngOnInit(): void {
    this.initializeUser(this.user);
    this.userDetailsForm = this.formBuilder.group({
      fullName: [''],
      email: [''],
      userName: [''],
      password: ['']
    });
  }
  initializeUser(newUser: UserModel) {
    newUser= {
    fullName:'',
    userName: '',
    role:'Administrator',
    email:'',
    password:''
    }
  }
  public get getUserFormData() {
    return this.userDetailsForm.controls;
  }
  setFormDataToModel(){
   this.user.fullName = this.userDetailsForm.controls['fullName'].value;
   this.user.email = this.userDetailsForm.controls['email'].value;
   this.user.userName = this.userDetailsForm.controls['userName'].value;
   this.user.password = this.userDetailsForm.controls['password'].value;
   console.log(this.user);
  }
  validPassword():boolean{
    if(this.user.password === this.confimrPass) return true;
    else return false;
  }
  OnSubmitForm() {
    this.isSubmitted = true;
    this.loading = true;
    if (this.userDetailsForm.invalid) {
      return;
    }
    this.setFormDataToModel();
    this.hasError =  this.validPassword();
    this.http.Post('AdmUser', this.user)
      .subscribe((resp) => {
        console.log(resp);
        this.loading = false;
        this.router.navigate(['/login']);
      });
    }

  }