import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  model: any ={};
  user: User;
  islogged: boolean = false;
  show: boolean = false;
  manager: boolean = false;
  errorMessage : string;
  userName : string = "";
  
  constructor(private userService: UserService, private router: Router, private modalService: NgbModal) {
    this.model.userName = "";
    this.model.passWord = "";
    this.userName = localStorage.getItem("userName");
    if (this.userName != "") {
      if (this.userName == "manager@pandada.com") this.manager = true;
      this.islogged = true;
    }
    console.log(this.userName);
    console.log(this.islogged);
   }

  ngOnInit() {

  }

  showForm() {
    if(this.show == true){
      this.show = false;
    }else{
      this.show = true;
    }  
  }

  login(LoginSucc,LoginFail) {
    if (this.model.userName == "") {
      this.errorMessage = "Please input userName first! ";
      console.log("empty");
      this.modalService.open(LoginFail,{});
      return;
    }
    this.userService.getUser(this.model.userName)
    .subscribe(
      (data:User) => {
        this.user = {
          userName: data['userName'],
          passWord: data['passWord'],
          products: data['products']
        };
        if (this.user.passWord == this.model.passWord) {
          localStorage.userName = this.user.userName;
          if (this.user.userName == "manager@pandada.com") {
            this.manager = true;
          }
          this.islogged = true;
          console.log( "successful ");
          this.modalService.open(LoginSucc,{});
          this.show = false;
          this.model.userName = "";
          this.model.passWord = "";
          
        }
        else {
          this.errorMessage = "Wrong password";
          this.modalService.open(LoginFail, {})
          .result.then( () => {this.errorMessage = ""});
        }

        console.log(this.user);
      },
      error => {
        this.errorMessage = error.error.message;
        this.modalService.open(LoginFail, {});
        this.model.userName = "";
        this.model.passWord = "";
      });
    }

  logOut() {
    this.islogged = false;
    this.router.navigate(['']);
    this.show = false;
    localStorage.userName = "";
    this.manager = false;
  }
}
