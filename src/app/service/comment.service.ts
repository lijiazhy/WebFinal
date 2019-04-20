import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  create( comment: Comment) {
    return this.http.post('http://localhost:3000/comment/create', comment);
  }

  get() {
    return this.http.get('http://localhost:3000/comment/get');
  }
}
