import { Component, OnInit } from '@angular/core';
import { CustomerOrderInfo } from '../../models/customer-order-info';

@Component({
  selector: 'app-customer-order-info',
  templateUrl: './customer-order-info.component.html',
  styleUrls: ['./customer-order-info.component.scss']
})
export class CustomerOrderInfoComponent implements OnInit {
  private order: CustomerOrderInfo = new CustomerOrderInfo();
  
  loading: boolean = false;

  constructor() { 
  }

  ngOnInit() {
  }
}
