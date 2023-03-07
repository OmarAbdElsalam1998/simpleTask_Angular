import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerTempService {

  _url:string="http://localhost:3000/customerTemp"
  constructor(private http:HttpClient) { }
  //when customer or admin loagged in
  getAllCustomersUpdates():Observable<any>{
    
      return this.http.get(this._url ).pipe(catchError((err)=>{
        return throwError (()=>err.message ||"internal server error")
      }));
    
  }
  getCustomerUpdatesByID(id:any){
    return this.http.get(this._url+`/${id}`).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }

  ConfirmUpdate(user:any)
  {
    return this.http.put(this._url, user).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }

}
