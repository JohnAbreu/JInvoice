import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<AuthenticatedUser>;

  //private
  private currentUserSubject: BehaviorSubject<AuthenticatedUser>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService,private route : Router) {
    this.currentUserSubject = new BehaviorSubject<AuthenticatedUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): AuthenticatedUser {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return false; //this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return false; //this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  get isAuthenticated(){
     let user = localStorage.getItem('currentUser');
     console.log(`isAuthenticated ${user}`)
     if(user == undefined){
        return false;
     }
     return true;
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    return this._http
               .post<any>(`${environment.apiUrl}/AdmUser/login`, { email, password })
               .pipe(
                  map(user => 
                        { 
                            localStorage.setItem('currentUser',JSON.stringify(user.authenticatedUser));
                            console.log(user);
                            return user;
                        ;})
                ).subscribe(
                  p => {
                    if (this.isAuthenticated) {
                      console.log('autenticado');
                      this.route.navigate(['/Products'])
                      return true;
                    }
                    else 
                    {
                      console.log('no autenticado');
                      return false;
                    }
                  },
                  error => {console.log(error)}
                );
  }

  welcome(){
    return this._http.get(`${environment.apiUrl}/AdmUser`)
                     .pipe(map(s =>{
                      console.log(s);
                    })).subscribe(
                      p => {},
                      error => {console.log(error)}
                    );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    console.log('logged out');
    // notify
    this.currentUserSubject.next(null);
  }
}
