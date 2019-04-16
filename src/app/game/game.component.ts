import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  price: string="$59.99"
  game: string="PlayerUnknown's Battlegrounds"
  username: string="user"
  comment: string="comment"
  loggeduser: string="Log in to comment"

  constructor() {
    this.loggeduser = localStorage.getItem("userName");
   }

  ngOnInit() {
  }

}
