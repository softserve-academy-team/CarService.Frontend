import { Component, OnInit, Input } from '@angular/core';
import { ProfileOrderInfo } from '../../models/profile-order-info';

@Component({
  selector: 'app-profile-order-card',
  templateUrl: './profile-order-card.component.html',
  styleUrls: ['./profile-order-card.component.scss']
})
export class ProfileOrderCardComponent implements OnInit {
  @Input() order: ProfileOrderInfo;
  @Input() link: string;
  private status: string;

  constructor() { }

  ngOnInit() {
    if (this.order.isDoIt === true)
      this.status = this.order.status;
    else
      this.status = "Don't get order"; 
  }

  getLink(): string {
    return `${this.link}${this.order.orderId}`;
  }
}
