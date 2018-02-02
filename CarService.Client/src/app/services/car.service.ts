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
    return this.httpClient.get<BaseCarInfo[]>(this.carUrlBuilder.build('cars', 'random'));
  }

  // api/cars/base-info/{id}
  getCarIds(carParams: NameValuePair[]): any {
    console.log('carParams array', carParams);
    const tempUrl = this.carUrlBuilder.build('cars', 'search');
    // tslint:disable-next-line:max-line-length
    const finalUrl = `${tempUrl}?${carParams[0].name}=${carParams[0].value}&${carParams[1].name}=${carParams[1].value}&${carParams[2].name}=${carParams[2].value}`;
    return this.httpClient.get<any>(finalUrl);
  }

}
