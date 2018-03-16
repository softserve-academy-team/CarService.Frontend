import { Component, OnInit } from '@angular/core';
import { ProfileOrderInfo } from '../../models/profile-order-info';
import { ProfileService } from '../../services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderStatus } from '../order-status';

declare let require: any;

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.scss']
})
export class ProfileOrdersComponent implements OnInit {
  isMechanic: boolean;
  loadingCreated = false;
  loadingApplied = false;
  enabledCreatedOrders = true;
  enabledAppliedOrders = true;

  private createdOrders: ProfileOrderInfo[];
  private appliedOrders: ProfileOrderInfo[];
  private decode = require('jwt-decode');

  constructor(private profileService: ProfileService) {

  }

  ngOnInit() {
    var decoded = this.decode(localStorage.getItem('token'));
    var tokenMap = new Map(Object.entries(decoded));
    this.isMechanic = tokenMap.get("http://schemas.microsoft.com/ws/2008/06/identity/claims/role").toString() === "mechanic";
    
    this.getUserCreatedOrders();
    
    if (this.isMechanic) {
      this.getUserAppliedOrders();
    }
  }

  private getUserCreatedOrders() {
    this.loadingCreated = true;
    
    this.profileService.getUserCreatedOrders().subscribe((data: ProfileOrderInfo[]) => {
      this.createdOrders = data;
      if (!this.createdOrders ||  this.createdOrders.length == 0)
      {
        this.enabledCreatedOrders = false;
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );

    this.loadingCreated = false;
  }

  private getUserAppliedOrders() {
    this.loadingApplied = true;

    this.profileService.getUserAppliedOrders().subscribe((data: ProfileOrderInfo[]) => {
      this.appliedOrders = data;
      if (!this.appliedOrders ||  this.appliedOrders.length == 0)
      {
        this.enabledAppliedOrders = false;
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );

    this.loadingApplied = false;
  }

  routerLinkForCreated(): string {
    return "/order-info/";
  }

  routerLinkForApplied(): string {
    return "/mechanic-order-info/";
  }
}
