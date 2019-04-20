import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  gameName: string= "The Sims 4";
  gameCompany: string="EA"
  gamePrice: number=59.99;
  totalPrice: number=100;
  liked: boolean=false;

  constructor(private router: Router) { }

  ngOnInit() {
    
    let table = document.getElementById("carttable");
    
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    for (var i = 0; i < cart.length; i ++) {
      var row = document.createElement('tr'); //创建行
      var like = document.createElement("td"); //创建第1列
      like.innerHTML = '<img src="../../assets/images/heart1.png" width="20px" height="20px" alt="like" (click)="like()">';
      var name = document.createElement("td");
      var company = document.createElement("td");
      var price = document.createElement("td");
      name.innerHTML=cart[i].searchID;
      company.innerHTML=cart[i].company;
      price.innerHTML=cart[i].price;
      row.appendChild(like);
      row.appendChild(name);
      row.appendChild(company);
      row.appendChild(price);
      table.appendChild(row);
    }
    
  }
  like() {
    if(this.liked)
    this.liked = false;
    else
    this.liked = true;
  }
  gotohome(){
    this.router.navigate(['']);
  }
  
  // buyGame() {

  //   if(localStorage.userName == "" ) {
  //     alert("please log in to buy this game.");
  //     return ;
  //   }

  //   let product = {
  //     productName: this.game.searchID
  //   };

  //   this.userService.addProduct(this.loggeduser, product)
  //   .subscribe(
  //     data => {
  //       //alert("successfully");
  //     })

  //   location.reload();
    
  // }
}
