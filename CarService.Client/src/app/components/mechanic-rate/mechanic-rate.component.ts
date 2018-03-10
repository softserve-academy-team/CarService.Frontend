import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mechanic-rate',
  templateUrl: './mechanic-rate.component.html',
  styleUrls: ['./mechanic-rate.component.scss']
})
export class MechanicRateComponent implements OnInit {

  @Input() rate: number;
  maxRate = 5;
  full: number;
  half: number;
  border: number;

  constructor() { }

  ngOnInit() {
    this.full = Math.trunc(this.rate);
    this.half = (this.rate - this.full) >= 0.5 ? 1 : 0;
    this.border = Math.round(this.maxRate - this.rate);
  }

  range(value: number) {
    return Array(value);
  }
}
