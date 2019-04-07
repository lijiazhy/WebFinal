import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: any = {};
  response: any;
  errorMessage: string;

  constructor(private userService: UserService, private route : Router, private modalService: NgbModal) { }

  ngOnInit() {
  }

  createUser(SignUpSucc, SignUpFail) {
    this.userService.create(this.model)
    .subscribe(
      data => {
        this.modalService.open(SignUpSucc, {});
        this.route.navigate(['/']);
      },
      error => {
        this.errorMessage = error.error.message;
        this.modalService.open(SignUpFail, {});
      });
  }
}
