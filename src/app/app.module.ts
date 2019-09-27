import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductModule } from './products/product.module';
import { NavbarComponent } from './shared/navbar/navbar.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckoutComponent,
    NavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'checkout', component: CheckoutComponent },

      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },

    ]),
    ProductModule
  ],
  bootstrap: [NavbarComponent]
})
export class AppModule { }
