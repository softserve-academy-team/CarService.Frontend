import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { RestUrlBuilder } from './rest-url-builder';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  private readonly carServiceApiBaseUrl: string;

  constructor(private http: HttpClient, private restUrlBuilder: RestUrlBuilder) {
    this.carServiceApiBaseUrl = environment['CarServiceApiBaseUrl'];
  }

  signIn(credentials) {

   return this.http.post<any>(this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'account', 'token'), credentials);
  //  .subscribe((res: any) => {
  //     localStorage.setItem('token', res.access_token);
  //   }
  //);
  }

  isAuthentificated(){
    return !!localStorage.getItem('token');
  }
}
