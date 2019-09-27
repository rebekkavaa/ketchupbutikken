import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  // template: `
  //   <nav class='navbar navbar-expand navbar-light bg-light'>
  //       <a class='navbar-brand'>{{pageTitle}}</a>
  //       <ul class='nav nav-pills'>
  //         <li><a class='nav-link' routerLinkActive='active' [routerLink]="['/welcome']">Home</a></li>
  //         <li><a class='nav-link' routerLinkActive='active' [routerLink]="['/products']">Cat List</a></li>
  //       </ul>
  //   </nav>
  //   <div class='container'>
  //     <router-outlet></router-outlet>
  //   </div>
  //   `
})
export class NavbarComponent implements OnInit {
  pageTitle = 'Catshop';

  constructor() { }

  ngOnInit() {
  }

}
