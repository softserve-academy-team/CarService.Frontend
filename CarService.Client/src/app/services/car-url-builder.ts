import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class CarUrlBuilder {

  private carServiceApiBaseUrl: string;

  constructor() {
    this.carServiceApiBaseUrl = environment['CarServiceApiBaseUrl'];
  }

  build(firstParam: string, ...params: string[]): string {
    let res = this.carServiceApiBaseUrl + `/${firstParam}`;
    params.forEach(param => {
      res += `/${param}`;
    });
    return res;
  }

}
