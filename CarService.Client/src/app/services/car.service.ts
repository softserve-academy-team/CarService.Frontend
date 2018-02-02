import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CarUrlBuilder } from './car-url-builder';
import { BaseCarInfo } from '../models/base-car-info';

@Injectable()
export class CarService {

  constructor(private httpClient: HttpClient, private carUrlBuilder: CarUrlBuilder) { }

  getListOfRandomCars(): Observable<BaseCarInfo[]> {
    return this.httpClient.get<BaseCarInfo[]>(this.carUrlBuilder.build('cars', 'random'));
  }

  // api/cars/base-info/{id}
  getCarBasicInfo(categoryId: number, makeId: number, modelId: number): Observable<BaseCarInfo[]> {
    const tempUrl = this.carUrlBuilder.build('cars', 'search');
    const finalUrl = `${tempUrl}?categoryId=${categoryId}&makeId=${makeId}&modelId=${modelId}`;
    return this.httpClient.get<BaseCarInfo[]>(finalUrl);
  }

}
