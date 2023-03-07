

export class User
{
    public firstName:string;
    public lastName:string;
    public email:string;
    public phone:any;
    public gender:string;
    public dateOfBirth:any;
    public Password:string;
    public address:any;
    public role:string;
    


    constructor(firstName:string,lastName:string,userEmail:string,phone:any,gender:string,dateOfBirth:any,Password:string,address:string,role:string)
    {
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=userEmail;
        this.phone=phone;
        this.gender=gender
        this.dateOfBirth=dateOfBirth;
        this.Password=Password;
        this.address=address;
        this.role=role;
       

  
      }


}