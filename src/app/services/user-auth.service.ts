import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  userId:BehaviorSubject<number>;
    constructor() { 
      this.userId=new BehaviorSubject<number>(-1);

    }
  logIn(id:number){

    this.userId.next(id);
    

  }
}
