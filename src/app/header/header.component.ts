import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model' 
// import { userInfo } from 'os';

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
    // if(this.user.userName != null){

    // }
    this.userService.create(this.model)
    .subscribe(

    //   data => this.router.navigate(['/'])  //when successfully created redirect to home
    // );

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
