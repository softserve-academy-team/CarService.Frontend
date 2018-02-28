import { Component, Input } from '@angular/core';
import { CarPhotoPipe } from '../../pipes/car-photo.pipe';
import { UserPhotoPipe } from '../../pipes/user-photo.pipe';
import { BaseOrderInfo } from '../../models/base-order-info';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {

  @Input() order: BaseOrderInfo;

}
