import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarUrlBuilder } from './car-url-builder';
import { Observable } from 'rxjs/Observable';
import { UserDTO } from '../models/userDTO';

@Injectable()
export class ProfileService {

  constructor(private httpClient: HttpClient, private carUrlBuilder: CarUrlBuilder) { }

  getUserInfo(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(this.carUrlBuilder.build("profile", "user-info"));
  }
}
