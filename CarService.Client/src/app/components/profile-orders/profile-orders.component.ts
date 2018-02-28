import { Component, OnInit } from '@angular/core';
import { ProfileOrderInfo } from '../../models/profile-order-info';

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.scss']
})
export class ProfileOrdersComponent implements OnInit {
  isMechanic: boolean;
  private orders: ProfileOrderInfo[] = [];

  constructor() { 
    this.isMechanic = false;
    for (var i = 0; i < 20; i++)
      this.orders.push(new ProfileOrderInfo());
  }

  ngOnInit() {
  }

}
