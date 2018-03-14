import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { OrderSearchModel } from '../models/order-search-model';
import { BaseOrderInfo } from '../models/base-order-info';
import { CreateOrder } from '../models/create-order';
import { RestUrlBuilder } from './rest-url-builder';
import { CreateReviewProposition } from '../models/create-review-proposition';

@Injectable()
export class OrderService {

    private readonly carServiceApiBaseUrl: string;

    public orderSearchButtonClicked: EventEmitter<OrderSearchModel>;
    public cityMarkerButtonClicked: EventEmitter<string>;

    constructor(private httpClient: HttpClient,
        private urlBuilder: RestUrlBuilder) {

        this.carServiceApiBaseUrl = environment['CarServiceApiBaseUrl']

        this.orderSearchButtonClicked = new EventEmitter<OrderSearchModel>();
        this.cityMarkerButtonClicked = new EventEmitter<string>();
    }

    getAllCities(): Observable<string[]> {
        let url = this.urlBuilder.build(this.carServiceApiBaseUrl, "orders", "cities");
        return this.httpClient.get<string[]>(url);
    }

    getOrders(orderSearchModel: OrderSearchModel, skip: number, take: number): Observable<BaseOrderInfo[]> {
        let url = this.urlBuilder.build(this.carServiceApiBaseUrl, "orders");
        return this.httpClient.post<BaseOrderInfo[]>(url, orderSearchModel, {
            params: new HttpParams()
                .set("skip", skip.toString())
                .append("take", take.toString())
        });
    }

    createOrder(order: CreateOrder) {
        return this.httpClient.post(this.urlBuilder.build(this.carServiceApiBaseUrl, 'orders', 'create-order'), order);
    }

    createReviewProposition(reviewProposition: CreateReviewProposition) {
        return this.httpClient.post(this.urlBuilder.build(this.carServiceApiBaseUrl, 'orders', 'create-review-proposition'), reviewProposition);
    }
}
