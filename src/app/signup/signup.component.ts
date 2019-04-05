import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: any = {};
  response: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
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
        alert(this.response);
      });
  }
}
