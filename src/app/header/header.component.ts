import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  model: any = {};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  userlogin() {
    document.getElementById("log").style.display = "block";
  }

  createUser() {
    this.userService.create(this.model)
    .subscribe(
      data => this.router.navigate(['/'])
    );
  }
}
