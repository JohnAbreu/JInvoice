import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedUser } from 'app/auth/models/authenticatedUser';
import { AuthenticationService } from 'app/auth/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:string = "";
  public password:string = "";
  public hasError:boolean = false;
  constructor(private authUser: AuthenticationService, private route: Router) { }

  login():boolean{
  this.authUser.login(this.email, this.password);
  if(!this.authUser.isAuthenticated){
     this.hasError = true;
     return false;
  }
  this.route.navigate(['/Products'])
  return true;
}
  ngOnInit(): void {
  }

}
