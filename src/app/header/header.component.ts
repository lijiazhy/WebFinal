import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  show: boolean = false;

  constructor(private userService: UserService, private router: Router) { }


  ngOnInit() {
  }
  showForm() {
    // document.getElementById("log").style.display = "block";
    if(this.show == true){
      this.show = false;
    }else{
      this.show = true;
    }  
  }
}
