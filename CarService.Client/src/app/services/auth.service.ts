import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(credentials) {
    this.http.post("http://localhost:53065/api/account", credentials, { responseType: 'text' }).subscribe(res => {
      localStorage.setItem('token', res);
    });
  }
}
