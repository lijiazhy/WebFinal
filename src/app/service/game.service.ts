import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Game } from '../model/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  create ( game: Game ) {
    return this.http.post('http://localhost:3000/game', game);
  }

  getGame (searchID: string)  {
    return this.http.get ( 'http://localhost:3000/game/' + searchID);
  }

}
