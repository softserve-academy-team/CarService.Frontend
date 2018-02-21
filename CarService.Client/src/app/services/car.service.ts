import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CarUrlBuilder } from './car-url-builder';
import { BaseCarInfo } from '../models/base-car-info';
import { DetailCarInfo } from '../models/detail-car-info';
import { NameValuePair } from '../models/name-value-pair';

@Injectable()
export class CarService {

  constructor(private httpClient: HttpClient, private carUrlBuilder: CarUrlBuilder) { }

  getListOfRandomCars(): Observable<BaseCarInfo[]> {
    return this.httpClient.get<BaseCarInfo[]>(this.carUrlBuilder.build('cars', 'base-info', 'random'));
  }

  getDetailCarById(id: number): Observable<DetailCarInfo> {
    return this.httpClient.get<DetailCarInfo>(this.carUrlBuilder.build('cars', 'detailed-info', id.toString()));

  }

  // api/cars/base-info/{id}
  getCarBasicInfo(carParams: NameValuePair[]): Observable<BaseCarInfo[]> {
    const tempUrl = this.carUrlBuilder.build('cars', 'search');
    // tslint:disable-next-line:max-line-length
    const finalUrl = `${tempUrl}?${carParams[0].name}=${carParams[0].value}&${carParams[1].name}=${carParams[1].value}&${carParams[2].name}=${carParams[2].value}`;
    return this.httpClient.get<BaseCarInfo[]>(finalUrl);
  }

  getCarPhotos(id:number):Observable<Array<string>>{
    return this.httpClient.get<Array<string>>(this.carUrlBuilder.build("cars", "detailed-info", id.toString(), "photos"));
  }
}
