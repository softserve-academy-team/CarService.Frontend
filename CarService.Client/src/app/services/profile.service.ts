import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserDTO } from '../models/userDTO';
import { RestUrlBuilder } from '../services/rest-url-builder';
import { environment } from '../../environments/environment';

@Injectable()
export class ProfileService {
  private readonly carServiceApiBaseUrl: string;
  
  constructor(private httpClient: HttpClient, private restUrlBuilder: RestUrlBuilder) { 
    this.carServiceApiBaseUrl = environment['CarServiceApiBaseUrl'];
  }

  getUserInfo(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(this.restUrlBuilder.build(this.carServiceApiBaseUrl,"profile", "user-info"));
  }
}
