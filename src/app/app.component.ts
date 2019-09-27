import { Component} from '@angular/core';
declare var payex: any;
@Component({
  selector: 'pm-root',
  template: `
  
    <nav class='navbar navbar-expand-lg'>
    <ul class='nav nav-pills'>
    <li><a class='nav-link' a href="/products" id='navlink' ><- back</a></li>
    </ul>
        <a class='navbar-brand' id='navlogo'>{{pageTitle}}</a>
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
