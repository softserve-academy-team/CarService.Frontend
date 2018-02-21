import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images: any[] = [
    {
      'src' : 'assets/car_service_1.jpg'
    },
    {
      'src' : 'assets/car_service_2.jpg'
    },
    {
      'src' : 'assets/car_service_3.jpg'
    },
    {
      'src' : 'assets/car_service_4.jpg'
    },
    {
      'src' : 'assets/car_service_5.jpg'
    },
    {
      'src' : 'assets/car_service_6.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }


}
