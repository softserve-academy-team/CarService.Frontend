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

  getUserInfo(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, "profile", "user-info"));
  }

  editCustomer(customer: CustomerEditData) {
    return this.httpClient.put(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'edit', 'customer'),
      customer);
  }

  editMechanic(mechanic: MechanicEditData) {
    return this.httpClient.put(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'edit', 'mechanic'),
      mechanic);
  }

  addCarToFavorites(id: number) {
    return this.httpClient.post<any>(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'favorites', 'add'),
      id);
  }

  deleteCarFromFavorites(id: number) {
    return this.httpClient.post<any>(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'favorites', 'delete'),
      id);
  }

  isCarInFavorites(id: number) {
    return this.httpClient.post<any>(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'favorites', 'isCarInFavorites'),
      id);
  }

  getAllCarsFromFavorites() {
    return this.httpClient.get<any>(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'favorites', 'get'));
  }


  getUserCreatedOrders() {
    return this.httpClient.get(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'created-orders'));
  }

  getUserAppliedOrders() {
    return this.httpClient.get(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'applied-orders'));
  }

  getUserAvatarUrl() {
    return this.httpClient.get(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'get-avatar'), {
        responseType: "text"
      });
    }
    
  getUserBoughtReviews() {
    return this.httpClient.get(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'bought-reviews'));
  }

  getUserCreatedReviews() {
    return this.httpClient.get(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'profile', 'created-reviews'));
  }
}
