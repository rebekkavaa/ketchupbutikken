import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductModule } from './products/product.module';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { BestsellersComponent } from '../app/shared/bestsellers/bestsellers.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckoutComponent,
    PaymentSuccessComponent,
    BestsellersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'paymentSuccess', component: PaymentSuccessComponent },
      { path: 'terms', component: BestsellersComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/home', pathMatch: 'full' },

    ]),
    ProductModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
