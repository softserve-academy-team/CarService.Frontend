import { Component, OnInit } from '@angular/core';
import { BaseCarInfo } from '../../models/baseCarInfo.model';
import { CarService } from '../../services/car.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.scss']
})
export class CarlistComponent implements OnInit {
  public cars: BaseCarInfo[];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getListCars().subscribe((data: BaseCarInfo[]) => {
      this.cars = data;
    },
    err => {
      console.log('Smth went wrong!');
    }
  );
  }
}
