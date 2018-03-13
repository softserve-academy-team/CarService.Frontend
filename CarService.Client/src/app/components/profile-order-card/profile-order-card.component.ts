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
  private color: string;
  
  constructor() { }

  ngOnInit() {
    if (this.order.isDoIt === true)
      this.status = this.order.status;
    else
      this.status = "Denied"; 

      switch(this.status)
      {
        case "Active": {
          this.color = "green";
          break;
        }
        case "Pending": {
          this.color = "orange";
          break;
        }
        case "Done": {
          this.color = "blue";
          break;
        }
        default: {
          this.color = "red";
        }
      }
  }

  getLink(): string {
    return `${this.link}${this.order.orderId}`;
  }
}
