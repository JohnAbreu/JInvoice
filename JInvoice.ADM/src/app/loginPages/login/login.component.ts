import { useAnimation } from '@angular/animations';
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
  
 

  constructor(public authUser: AuthenticationService, private route: Router) { }

  login() {
    //console.log(`entro al metodo login, ${this.email}, ${this.password}`);
    this.authUser.login(this.email, this.password);
  }
  ngOnInit(): void {
  }

  welcome(){
    console.log('before call ws.');
    this.authUser.welcome();
  }
}
