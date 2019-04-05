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
  model: any;
  user: User;
  constructor(private userService: UserService, private router: Router) { 
    
    console.log("user: "+ this.user);
  }

  ngOnInit() {
  }
  userlogin() {
    document.getElementById("log").style.display = "block";
  }

  createUser() {
    if(this.user.userName != null){

    }
    this.userService.create(this.model)
    .subscribe(
      data => this.router.navigate(['/'])  //when successfully created redirect to home
    );
  }
}
