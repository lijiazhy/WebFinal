import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  model: any = {};
  response: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  userlogin() {
    document.getElementById("log").style.display = "block";
  }

  createUser() {
    this.userService.create(this.model)
    .subscribe(
      data => {
        console.log(data);
        this.response = data['message'];
        alert(this.response);
      },
      error => {
        console.log('oops', error);
        this.response = error.error.message;
      });
  }
}
