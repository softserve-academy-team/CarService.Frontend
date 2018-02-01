import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { NameValuePair } from '../models/name-value-pair';

@Injectable()
export class FilterService {
  commonUrlPart = 'http://localhost:5000/api/cars/dropdown';
  typesUrl = `${this.commonUrlPart}/types`;
  makesUrl = `${this.commonUrlPart}/makes`;
  modelsUrl = `${this.commonUrlPart}/models`;
  constructor(private httpClient: HttpClient) { }

  getCarTypes(): Observable<NameValuePair[]> {
    return this.httpClient
    .get<NameValuePair[]>(this.typesUrl);
  }
  getCarMakes(categoryId: number): Observable<NameValuePair[]> {
    return this.httpClient
    .get<NameValuePair[]>(`${this.makesUrl}/${categoryId}`);
  }

  getCarModels(categoryId: number, makeId: number): Observable<NameValuePair[]> {
    // dropdown/models/{categoryId}/{makeId}
    console.log(`${this.modelsUrl}/${categoryId}/${makeId}`);
    return this.httpClient
    .get<NameValuePair[]>(`${this.modelsUrl}/${categoryId}/${makeId}`);
  }
}
