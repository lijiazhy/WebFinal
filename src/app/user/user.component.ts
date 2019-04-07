import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userName: string ;

  constructor() {
    let email =  localStorage.getItem("userName");
    let es = email.split('@');
    this.userName =es[0];
  }

  ngOnInit() {
  }

}
