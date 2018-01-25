import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseCarInfo } from '../models/baseCarInfo.model';
import { HttpClient } from '@angular/common/http';

const listUrl = 'http://localhost:5000/api/Cars/random';

@Injectable()
export class CarService {

  constructor(private http: HttpClient) { }
  
  getListCars(): Observable<BaseCarInfo[]> {
    return this.http.get<BaseCarInfo[]>(listUrl);
  }

  cars: BaseCarInfo[];
}
