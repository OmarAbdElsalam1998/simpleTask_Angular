import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 _url:string="http://localhost:3000/customer"
  constructor(private http:HttpClient) { }
  //when customer or admin loagged in
  logIn():Observable<any>{
    
      return this.http.get(this._url ).pipe(catchError((err)=>{
        return throwError (()=>err.message ||"internal server error")
      }));
    
  }

  registeration(user:any)
  {
    return this.http.post(this._url, user).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }

  getCustomerByID(id:any):Observable<any>{
    return this.http.get(this._url+`/${id}`).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }
}
