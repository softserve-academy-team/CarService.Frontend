import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { NameValuePair } from '../models/name-value-pair';

@Injectable()
export class FilterService {

  typesUrl = 'http://localhost:5000/api/cars/dropdown/types';
  constructor(private httpClient: HttpClient) { }

  getCarTypes(): Observable<NameValuePair[]> {
    return this.httpClient
    .get<NameValuePair[]>(this.typesUrl);
  }

}
