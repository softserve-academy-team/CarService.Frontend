import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { BaseCarInfo } from '../../models/base-car-info';
import { CarService } from '../../services/car.service';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  private listOfRandomCars: BaseCarInfo[];

  loading: boolean;

  constructor(
    private carService: CarService,
    private communicationService: CommunicationService
  ) { }

  ngOnInit() {
    this.getListOfRandomCars();
  }

  private getListOfRandomCars() {
    this.loading = true;

    this.carService.getListOfRandomCars().subscribe((data: BaseCarInfo[]) => {
      this.listOfRandomCars = data;
      this.communicationService.infoReceived.subscribe(d => {
        this.listOfRandomCars = d;
      });
      
      this.loading = false;
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
}
