import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchID : string = "";
  constructor(private activatedRoute: ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( (params: Params) => {
      this.searchID = params['game'];
    })

    let newUrl = '/game?game=' + this.searchID;
    this.router.navigateByUrl(newUrl);
  }

}
