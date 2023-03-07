import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomerService } from '../services/customer.service';
import { User } from '../shared Classes/user';
import { ConfirmPasswordValidator } from '../validators/confirmPassword';


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  constructor(private fb:FormBuilder,private customerService:CustomerService,private router:Router) { }

  ngOnInit(): void {
  }

  //set registeration form fields an its validation
  registerationForm=this.fb.group(
    {
    firstName:['',[Validators.required,Validators.pattern("^[a-zA-Z]{3,32}$")]],          
    lastName:['',[Validators.required,Validators.pattern("^[a-zA-Z]{3,32}$")]],           
    email:['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_-]+)@([a-zA-Z]+)\.(com|eg)$")]],
    phone:["",[Validators.required,Validators.pattern("^[0-9]{11}$")]], 
    gender:['',[Validators.required]],
    dateOfBirth:['',[Validators.required]],
    address:['',[Validators.required]] ,
    password:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9_-]{8,32}$")]],
    confirmpassword:[''] ,
    role:["customer"],
    completancePercentage:['80'] 
   
    },{validator:[ConfirmPasswordValidator,Validators.required]});
    
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
    get password()
    {
      return this.registerationForm.get('password')
    }
  
    get confirmpassword()
    {
      return this.registerationForm.get('confirmpassword')
    }    
          
  
    //when customer submit registeration Form
    userRegistering(){
      console.log(this.registerationForm.value)
      this.customerService.registeration(this.registerationForm.value).subscribe(result=>{
             
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Logged In Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(["/profile"]);

      },
      error=>{
        console.log(error);
      })
      
  
    
}
}
