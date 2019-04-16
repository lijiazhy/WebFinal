import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  model: any = {};
  errorMessage : string;
  he: any;

  constructor(private gameService: GameService, private route: Router, private modalService: NgbModal) {
    
  }

  ngOnInit() {
  }
  createUser(SignUpSucc, SignUpFail) {
    this.gameService.create(this.model)
    .subscribe(
      data => {
        this.modalService.open(SignUpSucc, {});
        this.route.navigate(['/addGame']);
      },
      error => {
        this.errorMessage = error.error.message;
        this.modalService.open(SignUpFail, {});
      });
      this.model = {};
  }
  
  showDemo(demo){
    this.he = this.model.url.split(':');
	if(this.he[0]=="https" || this.he[0]=="http")
	  demo.innerHTML="<label for='videoDemo'> Video Demo: </label><embed src='"+this.model.url+"' height='250' width='300' />";
	else
	  demo.innerHTML="<label for='videoDemo'> Video Demo: </label><embed src='https://url' height='250' width='300' />";
  }
  
}
