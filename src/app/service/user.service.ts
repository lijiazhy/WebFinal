import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  

  constructor(private http: HttpClient) { }

  create(user: User) {
    return this.http.post('http://localhost:3000' + '/user/create', user);
  }

  getUser ( email: String) {
    return this.http.get('http://localhost:3000/user/' + email);
  }
}
