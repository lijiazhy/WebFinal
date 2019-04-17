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

  addProduct( email: String, game: any) {
    return this.http.post('http://localhost:3000/user/' + email + '/product/add',  game );
  }
  
  update(email: String, user: User){
    return this.http.post('http://localhost:3000/user/'+email+'/password', user);
  }

  changeFavorate( email: String, game: any) {
    return this.http.post('http://localhost:3000/user/' + email + '/product/favorate',  game );
  }
}
