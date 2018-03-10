import { Component, OnInit, Input } from '@angular/core';
import { ProfileOrderInfo } from '../../models/profile-order-info';

@Component({
  selector: 'app-profile-order-card',
  templateUrl: './profile-order-card.component.html',
  styleUrls: ['./profile-order-card.component.scss']
})
export class ProfileOrderCardComponent implements OnInit {

  @Input() order: ProfileOrderInfo;

  constructor() { }

  ngOnInit() {
  }
}
