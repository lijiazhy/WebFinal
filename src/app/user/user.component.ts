import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userName: string ;
  model: any ={};
  isReg: boolean;
  isSucc: boolean;
  update: boolean;
  show: boolean;
  message : string;
  email: string;

  constructor(private userService: UserService) {
    this.model.passWord = "";
    this.isReg = false;
    this.isSucc = false;
    this.update=false;
    this.show=true;
    this.message="Password format is wrong!";
    this.email =  localStorage.getItem("userName");
    let es = this.email.split('@');
    this.userName =es[0];
  }
  
  checkPwd(){
    var passwordRegex = new RegExp("^(?=.*\\d+)(?=.*[a-zA-Z]+)(?=.*\\W+)[A-Za-z0-9\\W]{8,}$");
	if(passwordRegex.test(this.model.passWord)) {
	  document.getElementById("passWord").style.border="3px solid green";
	  document.getElementById("errorme").innerHTML="";
	  this.isReg = true;
	}
	else{
	  document.getElementById("passWord").style.border="none";
	  this.isReg = false;
	}
  }

  updatepwd() {
    if(this.isReg){
	  this.userService.update(this.email, this.model)
    .subscribe(
      data => {
	    this.show=false;
        this.isSucc=true;
      },
      error => {
        this.message = "Password  update failed!";
      });
	}
	else
	  document.getElementById("errorme").innerHTML="<p style='color:red;'>"+this.message+"</p>";
  }
  
  upt(){
    this.update=true;
	this.show=true;
  }

  cancel(){
    this.update=false;
	this.show = false;
  }
  
  cls(){
    this.isSucc = false;
	this.update=false;
  }

  ngOnInit() {
  }

}
