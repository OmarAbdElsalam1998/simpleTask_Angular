import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerTempService } from '../services/customer-temp.service';
import { CustomerService } from '../services/customer.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  customerInformation:any=[];
  customerId:any;
  disableField=true;
  updatedInfoStatus:any;
  constructor(
    private fb:FormBuilder,
    private customerService:CustomerService,
    private userAuth:UserAuthService,
    private CustomerTempService:CustomerTempService,
    ) { }
   
  ngOnInit(): void {
   this.customerId= this.userAuth.userId.value;
   this.customerService.getCustomerByID(this.customerId).subscribe(result=>{
    this.customerInformation=result;
    this.setCustomerInformation(result);
   })
   this.CustomerTempService.getCustomerUpdatesByID(this.customerId).subscribe((result:any)=>{
    this.updatedInfoStatus=result['status'];
   })

  }
  //set registeration form fields an its validation
  registerationForm=this.fb.group(
    {
    id:['']  ,
    firstName:['',[Validators.required,Validators.pattern("^[a-zA-Z]{3,32}$")]],          
    lastName:['',[Validators.required,Validators.pattern("^[a-zA-Z]{3,32}$")]],           
    email:['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_-]+)@([a-zA-Z]+)\.(com|eg)$")]],
    phone:["",[Validators.required,Validators.pattern("^[0-9]{11}$")]], 
    gender:['',[Validators.required]],
    dateOfBirth:['',[Validators.required]],
    address:['',[Validators.required]] ,
    alternativePhone:[''] ,
    alternativeAddress:[''] 
  
    
    });
    
    get firstName()
    {
      return this.registerationForm.get('firstName')
    }
    get lastName()
    {
      return this.registerationForm.get('lastName')
    }
  
    get email()
    {
      return this.registerationForm.get('email')
    }
    get phone()
    {
      return this.registerationForm.get('phone')
    }
    get gender()
    {
      return this.registerationForm.get('gender')
    }
    get dateOfBirth()
    {
      return this.registerationForm.get('dateOfBirth')
    }
    get address()
    {
      return this.registerationForm.get('address')
    }
    get alternativePhone()
    {
      return this.registerationForm.get('alternativePhone')
    }
  
    get alternativeAddress()
    {
      return this.registerationForm.get('alternativeAddress')
    }
   
          
   setCustomerInformation(info:any){
    this.registerationForm.controls['id'].setValue(this.customerId);
    this.registerationForm.controls['firstName'].setValue(info['firstName'])
    this.registerationForm.controls['lastName'].setValue(info['lastName'])
    this.registerationForm.controls['email'].setValue(info['email'])
    this.registerationForm.controls['phone'].setValue(info['phone'])
    this.registerationForm.controls['gender'].setValue(info['gender'])
    this.registerationForm.controls['dateOfBirth'].setValue(info['dateOfBirth'])
    this.registerationForm.controls['address'].setValue(info['address'])
    this.registerationForm.controls['alternativePhone'].setValue(info['alternativePhone'])
    this.registerationForm.controls['alternativeAddress'].setValue(info['alternativeAddress'])
   }

   saveUpdates(){
    this.CustomerTempService.ConfirmUpdate(this.registerationForm.value);
   }
    
}
