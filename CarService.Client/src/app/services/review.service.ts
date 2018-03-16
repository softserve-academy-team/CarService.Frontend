import { CreateReview } from './../models/create-review';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestUrlBuilder } from './rest-url-builder';
import { environment } from '../../environments/environment';

@Injectable()
export class ReviewService {

  private readonly carServiceApiBaseUrl: string;

  constructor(private httpClient: HttpClient, private restUrlBuilder: RestUrlBuilder) {
    this.carServiceApiBaseUrl = environment['CarServiceApiBaseUrl'];
  }

  createReview(data: CreateReview) {
    return this.httpClient.post<any>(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, "review", "create_review"), data);
  }

  getReview(data: number) {
    return this.httpClient.get(
      this.restUrlBuilder.build(this.carServiceApiBaseUrl, "review", "review-info", data.toString()));
  }
}
