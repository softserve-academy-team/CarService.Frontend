import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(credentials) {
    this.http.post<any>("https://localhost:44340/api/account/token", credentials).subscribe((res: any) => {
      localStorage.setItem('token', res.access_token);
    });
  }
}
