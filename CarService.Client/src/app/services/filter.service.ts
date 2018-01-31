import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { NameValuePair } from '../models/name-value-pair';

@Injectable()
export class FilterService {
  commonUrlPart = 'http://localhost:5000/api/cars/dropdown';
  typesUrl = `${this.commonUrlPart}/types`;
  makesUrl = `${this.commonUrlPart}/makes`;
  constructor(private httpClient: HttpClient) { }

  getCarTypes(): Observable<NameValuePair[]> {
    return this.httpClient
    .get<NameValuePair[]>(this.typesUrl);
  }
  getCarMakes(categoryId: number): Observable<NameValuePair[]> {
    return this.httpClient
    .get<NameValuePair[]>(`${this.makesUrl}/${categoryId}`);
  }

}
