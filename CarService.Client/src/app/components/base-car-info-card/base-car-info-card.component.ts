import { Component, OnInit, Input } from '@angular/core';
import { BaseCarInfo } from '../../models/base-car-info';

@Component({
  selector: 'app-base-car-info-card',
  templateUrl: './base-car-info-card.component.html',
  styleUrls: ['./base-car-info-card.component.scss']
})
export class BaseCarInfoCardComponent implements OnInit {

  @Input() car: BaseCarInfo;

  constructor() { }

  ngOnInit() {
  }

}
