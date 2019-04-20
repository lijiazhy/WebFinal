import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare let paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 
  totalPrice: number=0;

  addScript: boolean = false;
  paypalLoad: boolean = true;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ARjjUJ_73HwOeKxFffXFdsTz7ELSG5VvPrn6XUwUEimc3RgCz7rK-I1lRtH52xMl17kzZP8x1uUUVwkt',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.totalPrice, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        console.log("pay finish");
        localStorage.removeItem("cart");
        location.reload();
      })
    }
  };

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }


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
        this.totalPrice += cart[i].price;
        button.innerHTML = '<img src="../../assets/images/delete.png" height="20px" width="20px">';
        button.addEventListener("click",this.delete); 
        row.appendChild(name);
        row.appendChild(company);
        row.appendChild(price);
        row.appendChild(button);
        table.appendChild(row);
      }
    }

    this.addPaypalScript().then(() => {
      paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
      this.paypalLoad = false;
    });
    
  } //ngOninit
 
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
