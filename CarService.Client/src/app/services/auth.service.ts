import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare let require: any;

@Injectable()
export class AuthService {
  private decode = require('jwt-decode');

  constructor(private http: HttpClient) { 
    
  }

  signIn(credentials) {
    this.http.post<any>("http://localhost:5000/api/account/token", credentials).subscribe((res: any) => {
      localStorage.setItem('token', res.access_token);
    });
  }

  get isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  get userEmail(): string {
    var decoded = this.decode(localStorage.getItem('token'));
    var tokenMap = new Map(Object.entries(decoded));
    return tokenMap.get("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name").toString();
  }
}