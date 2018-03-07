import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestUrlBuilder } from './rest-url-builder';
import { CreateOrder } from '../models/create-order';

@Injectable()
export class OrderService {

  private readonly carServiceApiBaseUrl: string;

  constructor(private httpClient: HttpClient, private restUrlBuilder: RestUrlBuilder) {
    this.carServiceApiBaseUrl = environment['CarServiceApiBaseUrl'];
  }

  createOrder(order: CreateOrder) {
    return this.httpClient.post(this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'order', 'create-order'), order);
  }
}
