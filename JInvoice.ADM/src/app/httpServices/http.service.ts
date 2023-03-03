import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { AuthenticationService } from "app/auth/service";
import { AuthenticatedUser } from "app/auth/models/authenticatedUser";
import { environment } from "environments/environment";



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public currentUser : AuthenticatedUser;
  public params: HttpParams = new HttpParams;

  constructor(public httpClient : HttpClient,
              private authService : AuthenticationService) {
      this.currentUser = this.authService.currentUserValue;
  }

  loadPararms( name :string ='',categoryID:number =0, 
   active: boolean = true, skip: number=0, take:number =10,
   total:number =0){
     
     if(name != '' &&  categoryID != 0){
      this.params = new HttpParams()
                                  .set('Paginator.SkipRecords',skip)
                                  .set('Paginator.TakeRecords',take)
                                  .set('Paginator.TotalRecords',total)
                                  .set('RequestQuery.Name', name)
                                  .set('RequestQuery.categoryID', categoryID)
                                  .set('RequestQuery.IsActive', active);
     }
     else if (name != '' ){
      this.params = new HttpParams()
                                  .set('Paginator.SkipRecords',skip)
                                  .set('Paginator.TakeRecords',take)
                                  .set('Paginator.TotalRecords',total)
                                  .set('RequestQuery.Name', name)
                                  .set('RequestQuery.IsActive', active);

     }
     else if (categoryID != 0){
      this.params = new HttpParams()
                                  .set('Paginator.SkipRecords',skip)
                                  .set('Paginator.TakeRecords',take)
                                  .set('RequestQuery.categoryID', categoryID)
                                  .set('RequestQuery.IsActive', active);
     }
     else{
      this.params = new HttpParams()
                                  .set('Paginator.SkipRecords',skip)
                                  .set('Paginator.TakeRecords',take)
                                  .set('Paginator.TotalRecords',total);
     }    
     console.log(this.params.toString());                         
  }

  GetAll<T>(endPoint){
      return this.httpClient.get(`${environment.apiUrl}/${endPoint}?${this.params}`)
                            .pipe(map((res) => {return <T>res}));
  }
  Get<T>(endPoint, id){
    return this.httpClient.get(`${environment.apiUrl}/${endPoint}/${id}`)
                          .pipe(map((res) => {return <T>res}));
}

  Post(endPoint, body){
     return this.httpClient.post(`${environment.apiUrl}/${endPoint}`, body)
                     .pipe(map(data => data));
  }

  Put(endPoint, body){
      return this.httpClient.put(`${environment.apiUrl}/${endPoint}`, body)
                      .pipe(map(data => data));
   }

   Delete(endPoint, recordId){
      return this.httpClient.delete(`${environment.apiUrl}/${endPoint}/${recordId}`)
                      .pipe(map(data => data));
   }
}
