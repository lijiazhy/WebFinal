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
    console.log(cart)
    if(cart == undefined){
      var row = document.createElement("tr");
      var td = document.createElement("td");
      td.setAttribute("colspan","5");
      td.setAttribute("style","text-align:left;");
      td.innerHTML = "<h3>The cart is empty</h3>";
      row.appendChild(td);
      table.appendChild(row);
    }else{
      for (var i = 0; i < cart.length; i ++) {
        var row = document.createElement('tr'); //创建行
        var name = document.createElement("td");
        var company = document.createElement("td");
        var price = document.createElement("td");
        var button = document.createElement("td");
        name.innerHTML=cart[i].searchID;
        company.innerHTML=cart[i].company;
        price.innerHTML="$"+cart[i].price;
        button.innerHTML = '<img src="../../assets/images/delete.png" height="20px" width="20px">';
        button.addEventListener("click",this.delete); 
        row.appendChild(name);
        row.appendChild(company);
        row.appendChild(price);
        row.appendChild(button);
        table.appendChild(row);
      }
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
  delete(){
    var td = (<HTMLElement>event.target).parentElement;
    var tr = ( <HTMLElement>td ).parentElement;
    var id = (<HTMLElement>tr).children[0].innerHTML;
    var tbody=( <HTMLElement>tr ).parentElement;
    tbody.removeChild(tr);
    var cart = JSON.parse(localStorage.getItem("cart"));
    for(var i=0;i<cart.length;i++){
      if(id == cart[i].searchID)
      cart.splice(i,1);
    }
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(cart));
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
