import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { RestUrlBuilder } from './rest-url-builder';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare let require: any;

@Injectable()
export class AuthService {
  private readonly carServiceApiBaseUrl: string;
  private decode = require('jwt-decode');

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

  get isAuthentificated() {
    return !!localStorage.getItem('token');
  }

  get isMechanic() {
    if (!this.isAuthentificated)
      return false;
      
    var decoded = this.decode(localStorage.getItem('token'));
    var tokenMap = new Map(Object.entries(decoded));
    return tokenMap.get("http://schemas.microsoft.com/ws/2008/06/identity/claims/role").toString() === "mechanic";
  }
}
