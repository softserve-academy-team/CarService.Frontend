import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CarUrlBuilder } from './car-url-builder';
import { BaseCarInfo } from '../models/base-car-info';

@Injectable()
export class CarService {

  constructor(private httpClient: HttpClient, private carUrlBuilder: CarUrlBuilder) { }

  getListOfRandomCars(): Observable<BaseCarInfo[]> {
    return this.httpClient.get<BaseCarInfo[]>(this.carUrlBuilder.build("cars", "random"));
  }

}
