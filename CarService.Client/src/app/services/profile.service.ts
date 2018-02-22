import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserDTO } from '../models/userDTO';
import { RestUrlBuilder } from '../services/rest-url-builder';
import { environment } from '../../environments/environment';
import { CustomerEditData } from '../models/customer-edit-data';
import { MechanicEditData } from '../models/mechanic-edit-data';

@Injectable()
export class ProfileService {
  private readonly carServiceApiBaseUrl: string;

  constructor(private httpClient: HttpClient, private restUrlBuilder: RestUrlBuilder) {
    this.carServiceApiBaseUrl = environment['CarServiceApiBaseUrl'];
  }

  getUserInfo(email: string): Observable<UserDTO> {
    console.log(email);
    return this.httpClient.post<UserDTO>(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, "profile", "user-info"), 
      email, 
      {headers: new HttpHeaders().set('Content-Type', 'application/json')}
    );
  }

  editCustomer(customer: CustomerEditData) {
    return this.httpClient.post(this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'edit', 'customer'), customer);
  }

  editMechanic(mechanic: MechanicEditData) {
    return this.httpClient.post(this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'edit', 'mechanic'), mechanic);
  }
}
