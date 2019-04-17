import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  gameName: string= "The Sims 4";
  gamePrice: string="$59.99";
  totalPrice: number= 100

  constructor() { }

  ngOnInit() {
  }

}
