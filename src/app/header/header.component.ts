import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  show: boolean = false;
  model: any ={};
  user: User;
  islogged: boolean = false;


  constructor(private userService: UserService, private router: Router) { }


  ngOnInit() {
  }

  showForm() {
    if(this.show == true){
      this.show = false;
    }else{
      this.show = true;
    }  
  }

  login() {
    this.userService.getUser(this.model.userName)
    .subscribe(
      (data:User) => {
        this.user = {
          userName: data['userName'],
          passWord: data['passWord'],
          products: data['products']
        };
        if (this.user.passWord == this.model.passWord) {
          this.islogged = true;
          console.log( "successful ");
          this.show = false;
        }
        else {
          console.log( " fail " );
        }

        console.log(this.user);
      },
      error => {
        console.log(error.error.message);
      });
    }

  logOut() {
    this.islogged = false;
    this.router.navigate(['']);
  }
}
