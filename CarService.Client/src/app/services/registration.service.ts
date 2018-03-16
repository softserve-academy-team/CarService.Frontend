import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestUrlBuilder } from './rest-url-builder';
import { CustomerRegistrationData } from '../models/customer-registration-data';
import { MechanicRegistrationData } from '../models/mechanic-registration-data';

@Injectable()
export class RegistrationService {

    private readonly carServiceApiBaseUrl: string;

    constructor(private httpClient: HttpClient, private restUrlBuilder: RestUrlBuilder) {
        this.carServiceApiBaseUrl = environment['CarServiceApiBaseUrl'];
    }

    registerCustomer(customer: CustomerRegistrationData) {
        return this.httpClient.post(this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'account', 'registration', 'customer'), customer);
    }
    registerMechanic(mechanic: MechanicRegistrationData) {
        return this.httpClient.post(this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'account', 'registration', 'mechanic'), mechanic);
    }

}