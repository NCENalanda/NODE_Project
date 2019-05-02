import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { config } from '../app.config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http: HttpClient,
               private alertService: AlertService) { }

  getUsers(): User[] {

    const users: User[] = [];
    this.http.get<User[]>(`${config.apiUrl}/admin/getusers`)
         .subscribe(data => { data.forEach( d1 => {
           const user = new User();
           user.id = d1.id; user.firstName = d1.firstName; user.lastName = d1.lastName;
           user.username = d1.username; user.token = d1.token;
           users.push(user); });
           },
           error => {this.alertService.error = error; }
           );
    return users;
}

getImages() {
  return this.http.get<any>(`${config.apiUrl}/file1/images`);
}
}
