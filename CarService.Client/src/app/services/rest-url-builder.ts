import { Injectable } from '@angular/core';

@Injectable()
export class RestUrlBuilder {
  build(baseUrl: string, ...params: string[]): string {
    let url = baseUrl;
    params.forEach(param => {
      url += `/${param}`;
    });
    return url;
  }
}
