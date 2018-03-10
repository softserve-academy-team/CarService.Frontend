import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { RestUrlBuilder } from './rest-url-builder';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private readonly carServiceApiBaseUrl: string;

  constructor(private http: HttpClient, 
              private restUrlBuilder: RestUrlBuilder,
              private router: Router) {
    this.carServiceApiBaseUrl = environment['CarServiceApiBaseUrl'];
  }

  signIn(credentials) {
   return this.http.post<any>(this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'account', 'token'), credentials);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  get isAuthentificated(){
    return !!localStorage.getItem('token');
  }
}
