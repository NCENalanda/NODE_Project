import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { config } from '../app.config';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${config.apiUrl}/admin/getusers`);
}
}
