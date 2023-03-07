import { Component, OnInit } from '@angular/core';
import { CustomerTempService } from '../services/customer-temp.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  allCustomersUpdates:any;
  selectedCustomer:any=[];
  constructor(private customerTempService:CustomerTempService) { }

  ngOnInit(): void {
    this.customerTempService.getAllCustomersUpdates().subscribe(result=>{
      this.allCustomersUpdates=result;
    })
  }

  viewCustomerUpdates(id:any){
    this.customerTempService.getCustomerUpdatesByID(id).subscribe(result=>{
      this.selectedCustomer=result;
      console.log(result)
    })

  }

}
