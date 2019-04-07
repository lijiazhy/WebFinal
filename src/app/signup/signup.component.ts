import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: any = {};
  response: any;

  constructor(private userService: UserService, private route : Router) { }

  ngOnInit() {
  }

  createUser() {
    this.userService.create(this.model)
    .subscribe(
      data => {
        this.route.navigate(['/']);
      },
      error => {
        this.response = error.error.message;
        console.log('oops', this.response);
      });
  }
}
