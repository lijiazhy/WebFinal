import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { GameService } from '../service/game.service';
import { Game } from '../model/game.model';
import { Router } from '@angular/router';

//declare let game: Game;

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
  user: User;
  hasgame: boolean=false;
  haslike: boolean=false;
  numofgame: number=0;
  numoflike: number=0;

  constructor(private router: Router,private userService: UserService, private gameService: GameService) {
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

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    // if(Number(this.user.products.length) != 0)  this.hasgame == true;
    for (var i = 0; i < this.user.products.length; i++){
      let state = this.user.products[i].state;
      if(state == -1 || state == 1){  //haslike
        this.haslike = true;
        this.numoflike += 1;
      }
      if(state == 0 || state == 1){  //hasgame
        this.hasgame = true;
        this.numofgame += 1;
      }
    }
    
    for (var i = 0; i < this.user.products.length; i++) {
      let state = this.user.products[i].state;

      this.gameService.getGame(String(this.user.products[i].productName)).subscribe(
        (data:Game) => {
          console.log(data);
          console.log("a" + state);
          if (state == -1) {
            console.log("unown favorite");
            let table = document.getElementById("fItem");
            let row = document.createElement("tr");
            
            let img = document.createElement("td");
            let name = document.createElement("td");
            let company = document.createElement("td");
            let price = document.createElement("td");

            let inImg = document.createElement("img");
            inImg.src = String(data.pictuer1);
            inImg.setAttribute("style","width:200px; height:110px");
            let view = document.createElement("td");
            let t = document.createElement("button");
            t.setAttribute("class","btn btn-dark");
            //t.setAttribute("style")
            t.innerHTML = "view Details";
            t.addEventListener("click", () => {
              let newURL = `/search?game=` + data.searchID;
              console.log(newURL);
              this.router.navigateByUrl(newURL);
            });
            view.appendChild(t);

            img.appendChild(inImg);
            name.innerHTML = data.gameName;
            company.innerHTML = data.company;
            price.innerHTML = "$" + String(data.gamePrice);
            row.appendChild(img);
            row.appendChild(name);
            row.appendChild(company);
            row.appendChild(price);
            row.appendChild(view);
            table.appendChild(row);

          }
          if (state == 0) {
            console.log("own unfavorite");
            let row = document.getElementById("boughtTable");
            let td = document.createElement("td");
            let d = document.createElement('div');
            d.setAttribute("style","height:300px;width:480px;padding: 0 15px 0 15px;");
            d.setAttribute("id","card");
            let img = document.createElement("img");
            img.src = String(data.pictuer1);
            img.setAttribute("style","height: 250px;width: 450px;");
            let name = document.createElement("button");
            name.setAttribute("class", "btn btn-dark");
            name.setAttribute("style", "background-color:#222222; border:none; font-size:20px; color:white;margin-left:180px");
            name.addEventListener("click", () => {
              let newURL = `/search?game=` + data.searchID;
              console.log(newURL);
              this.router.navigateByUrl(newURL);
            });
            
            //name.setAttribute("style","color:white;text-align:center;font-size:20px;");
            name.innerHTML = String(data.gameName);
            d.appendChild(img);
            d.appendChild(name);
            td.appendChild(d);
            row.appendChild(td);

          }
          if (state == 1) {
            console.log("own favorite");
            let table = document.getElementById("fItem");
            let row = document.createElement("tr");
            let img = document.createElement("td");
            let name = document.createElement("td");
            let company = document.createElement("td");
            let price = document.createElement("td");

            let inImg = document.createElement("img");
            inImg.src = String(data.pictuer1);
            inImg.setAttribute("style","width:200px; height:110px");
            img.appendChild(inImg);

            let view = document.createElement("td");
            let t = document.createElement("button");
            t.setAttribute("class","btn btn-dark");
            //t.setAttribute("style")
            t.innerHTML = "view Details";
            t.addEventListener("click", () => {
              let newURL = `/search?game=` + data.searchID;
              console.log(newURL);
              this.router.navigateByUrl(newURL);
            });
            view.appendChild(t);
            name.innerHTML = data.gameName;
            company.innerHTML = data.company;
            price.innerHTML = "$" + String(data.gamePrice);
            row.appendChild(img);
            row.appendChild(name);
            row.appendChild(company);
            row.appendChild(price);
            row.appendChild(view);
            table.appendChild(row);

            let row1 = document.getElementById("boughtTable");
            let td = document.createElement("td");
            let d = document.createElement('div');
            d.setAttribute("style","height:300px;width:480px;padding: 0 15px 0 15px;");
            d.setAttribute("id","card");
            let img1 = document.createElement("img");
            img1.src = String(data.pictuer1);
            img1.setAttribute("style","height: 250px;width: 450px;");
            let name1 = document.createElement("button");
            name1.setAttribute("class", "btn btn-dark");
            name1.setAttribute("style", "background-color:#222222; border:none; font-size:20px; color:white;margin-left:180px");
            name1.addEventListener("click", () => {
              let newURL = `/search?game=` + data.searchID;
              console.log(newURL);
              this.router.navigateByUrl(newURL);
            });
            name1.innerHTML = String(data.gameName);
            d.appendChild(img1);
            d.appendChild(name1);
            td.appendChild(d);
            row1.appendChild(td);
          }
        }
      )
    }

    
  }
  test() {
    //console.log(this.user);
    //this.router.navigateByUrl("newURL");
  }

  gameProfile(searchID:any) {
    console.log(searchID);
    //let searchID;
    return function() {
      
      
      let newURL = `/search?game=` + searchID;
      console.log(newURL);
      this.router.navigateByUrl(newURL);
    }
    
		
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

  
}
