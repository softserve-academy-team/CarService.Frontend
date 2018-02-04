import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CarUrlBuilder } from './car-url-builder';
import { BaseCarInfo } from '../models/base-car-info';
import { NameValuePair } from '../models/name-value-pair';

@Injectable()
export class CarService {

  constructor(private httpClient: HttpClient, private carUrlBuilder: CarUrlBuilder) { }

  getListOfRandomCars(): Observable<BaseCarInfo[]> {
    return this.httpClient.get<BaseCarInfo[]>(this.carUrlBuilder.build('cars', 'base-info', 'random'));
  }

  // api/cars/base-info/{id}
  getCarBasicInfo(carParams: NameValuePair[]): Observable<BaseCarInfo[]> {
    console.log('carParams array', carParams);
    const tempUrl = this.carUrlBuilder.build('cars', 'search');
    // tslint:disable-next-line:max-line-length
    const finalUrl = `${tempUrl}?${carParams[0].name}=${carParams[0].value}&${carParams[1].name}=${carParams[1].value}&${carParams[2].name}=${carParams[2].value}`;
    console.log('http request made to get basic info', finalUrl);
    return this.httpClient.get<BaseCarInfo[]>(finalUrl);
  }

}
