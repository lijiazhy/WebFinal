import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Game } from '../model/game.model';
import { GameService } from '../service/game.service';
import { UserService } from '../service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

declare let paypal: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  price: string;
  gameName: string;
  description: string;
  video: string;
  game: Game;
  imgageURL: string;
  searchID: string;
  username: string="user";
  company: string;

  loggeduser: string;
  _UNFAVORITE: string = "Add to Wish List";
  _FAVORITE: string = "In Wish List";
  _INCART: string = "In Cart";
  _NOTINCART: string = "Add to Cart";
  favorite: string = "";
  purchase: string = "";
  confirmBuy: boolean = false;
  inCart: boolean = false;
  cartText: string = "";

  finalAmount: number = 10;
  addScript : boolean = false;
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
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
      })
    }
  };


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private gameService: GameService, private userService: UserService) { 
    this.loggeduser = localStorage.userName == ""? "log in to comment" : localStorage.userName;
    //location.reload();

  }



  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( (params: Params) => {
      this.searchID = params['game'];
      console.log(params['game']);
    });

    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    let flag: boolean = false;
    if (cart == undefined) {
      console.log(1);
      this.inCart = false;
      this.cartText = this._NOTINCART;
    }
    else{
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].searchID == this.searchID) {
          flag = true;
          break;
        }
      }
      
    } 
    if (flag) {
      this.inCart = true;
      this.cartText = this._INCART;
    }
      

    this.gameService.getGame(this.searchID)
    .subscribe( (data: Game) => {
      this.game = {
        searchID: data['searchID'],
        gameName: data['gameName'],
        description: data['description'],
        gamePrice: data['gamePrice'],
        company: data['company'],
        pictuer1: data['pictuer1'],
        picture2: data['picture2'],
        url: data['url']
      };
      console.log(this.game);
      this.gameName = this.game.gameName;
      this.price = String(this.game.gamePrice);
      this.video = this.game.url;
      this.imgageURL = this.game.picture2;
      this.description = this.game.description;
      this.purchase = "$" + this.price;
      this.company = this.game.company;

      let html = `<embed src="${this.video}"  height="500" width="850"/>`;
      document.getElementById('gameVideo').innerHTML = html;
    })
    if (this.loggeduser == "") {
      this.favorite = this._UNFAVORITE;
    }
    else {
      this.userService.getUser(this.loggeduser)
      .subscribe( 
        (data: User) => {
          
          var i = 0;
          for (; i < data['products'].length; i ++) {
            if (data['products'][i].productName == this.game.searchID) {
              // unown favorite
              if (data['products'][i].state == -1) {
                this.favorite = this._FAVORITE;
                break;
              }
              // own favorite
              else if(data['products'][i].state == 1) {
                this.favorite = this._FAVORITE;
                break;
              }
              //own unfavorite
              else if(data['products'][i].state == 0){
                this.favorite = this._UNFAVORITE;
                break;
              }
            }
          }
            if (i == data['products'].length || Number(data['products'].length) == 0) {
              this.favorite = this._UNFAVORITE;
            }
          error => {
            alert(error.error.message);
          }

        }
      )
    }
    
    //load paypal
    // this.addPaypalScript().then(() => {
    //   paypal.Button.render(this.paypalConfig, `paypal-checkout-btn`);
    //   this.paypalLoad = false;
    // })
    

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

  favoreteAction() {
    if (localStorage.userName == "" ) {
      alert("please log in to add favorite.");
      return;
    }
    let product = {
      productName: this.game.searchID
    };
    this.userService.changeFavorite(this.loggeduser, product)
    .subscribe(
      data => {
        alert(data['message']);
      })

    location.reload();
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  addToCart() {

    if (!this.inCart) {
      var cart = JSON.parse(localStorage.getItem("cart"));
      if (cart == undefined) {
        //console.log(123);
        let cs = [];
        cs[0] = {'searchID': this.game.searchID, 'company': this.game.company, 'price' : this.game.gamePrice};
        localStorage.setItem("cart", JSON.stringify(cs));
      }
      else {
        cart[cart.length] = {'searchID': this.game.searchID, 'company': this.game.company, 'price' : this.game.gamePrice};
        if( cart.indexOf(this.game.searchID) < 0 ) {
          localStorage.removeItem("cart");
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
      console.log(localStorage.cart);
      location.reload();
    }
    else {
      console.log("go to cart");
      this.router.navigate(['/cart']);
    }

  }



}
