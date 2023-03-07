import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomerService } from '../services/customer.service';
import { UserAuthService } from '../services/user-auth.service';
// import { userLogin } from '../userLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  title="Sign IN";
  errorLogin=false;
   isAdmin:boolean=false;
  constructor(
    private titleService:Title ,
     private fB: FormBuilder ,
      private customerService : CustomerService ,
      private router: Router,
      private userAuth:UserAuthService,
      private location:Location)   { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
   
  }

  loginForm =this.fB.group(
    {
      userEmail:['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_-]+)@([a-zA-Z]+)\.(com|eg)$")]],
      userPassword:['',[Validators.required,Validators.pattern("^([a-zA-Z0-9]+){6,32}$")]],

    }
  );

  get userEmail()
  {
    return this.loginForm.get('userEmail')
  }

  get userPassword()
  {
    return this.loginForm.get('userPassword')

  }
  
  usersArr:any;


  submitLogInForm()
  {
    // console.log(this.loginForm.value)

      this.customerService.logIn().subscribe(data=>{             
      console.log(data)
      this.usersArr=data;
      var checkUser=this.usersArr?.filter((user:any)=>
    user.email== this.userEmail?.value && user.password ==this.userPassword?.value
    )
    console.log(checkUser)
   

    if(checkUser.length>0){
    
      console.log(checkUser[0])
      this.userAuth.logIn(checkUser[0].id)
        if(checkUser[0].role=="admin"){
           
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Logged In Successfully',
          showConfirmButton: false,
          timer: 1500
        })
          this.router.navigate(['/dashboard/admin']);
        }
        else if(checkUser[0].role=="customer"){
          this.router.navigate(["/profile"]);
          //this.location.back();
          console.log(this.location);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Logged In Successfully',
            showConfirmButton: false,
            timer: 1500
          })
  
        }

    }
    else{
          this.errorLogin=true;
          setTimeout(()=>{this.errorLogin=false},5000)

    }

    


     
    },
    error => 
    {
      console.log("Fail login"+error)
    }
    )
    
    


  }

}

