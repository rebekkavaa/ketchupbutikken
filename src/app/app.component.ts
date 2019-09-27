import { Component} from '@angular/core';
declare var payex: any;
@Component({
  selector: 'pm-root',
  template: `
  
    <nav class='navbar navbar-expand-lg navbar-dark bg-light'>
    <ul class='nav nav-pills'>
    <li><a class='nav-link' routerLinkActive='active' [routerLink]="['/home']"><- back</a></li>
    </ul>
        <a class='navbar-brand'>{{pageTitle}}</a>
    </nav>
    <div class='container' id='bckg'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  pageTitle = 'Catshop';


}
