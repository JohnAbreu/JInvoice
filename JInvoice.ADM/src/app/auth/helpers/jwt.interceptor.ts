import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _authenticationService: AuthenticationService) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
      const currentUser = this._authenticationService.currentUserValue;
      let user = JSON.parse(localStorage.getItem('currentUser'));
            
      if (user == undefined)
        return next.handle(request);
      
      console.log(user.token);

      //const isLoggedIn = currentUser && currentUser.token;
      const isLoginUrl = 'AdmUser/login'; // request.url.startsWith(environment.apiUrl);

      if (request.url.indexOf(isLoginUrl) == -1) {
          console.log(`user token : ${user.token}`);
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.token}`
            }
        });
      }
    return next.handle(request);
  }
}
