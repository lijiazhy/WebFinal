import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { GameService } from '../service/game.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { Game } from '../model/game.model';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  model: any ={};
  user: User;
  game: Game;
  islogged: boolean = false;
  show: boolean = false;
  manager: boolean = false;
  errorMessage : string;
  userName : string = "";
  
  constructor(private userService: UserService, private gameService: GameService, private router: Router, private modalService: NgbModal) {
    this.model.userName = "";
    this.model.passWord = "";
	this.model.search = "";
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
  
  search(SearchFail){
    if (this.model.search == "") {
      this.errorMessage = "Please input game name! ";
      console.log("empty search");
      this.modalService.open(SearchFail,{});
      return;
    }
	this.gameService.getGame(this.model.search)
    .subscribe(
      (data:Game) => {
        this.game = {
          gameName: data['gameName'],
          description: data['description'],
          gamePrice: data['gamePrice'],
          company: data['company'],
          pictuer1: data['picture1'],
          picture2: data['picture2']
        };
		if (this.game.gameName==this.model.search) {
		  this.router.navigate(['game']);
          console.log( "search successful");
          this.model.search = "";
        }
        else {
          this.errorMessage = "No such game";
          this.modalService.open(SearchFail, {})
          .result.then( () => {this.errorMessage = ""});
        }
		console.log(this.user);
      },
      error => {
        this.errorMessage = error.error.message;
        this.modalService.open(SearchFail, {});
        this.model.search = "";
      });
  }
}
