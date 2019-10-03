import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cat } from '../shared/productlist/Cat'




@Component({
  selector: 'pm-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})

export class PaymentSuccessComponent implements OnInit, OnDestroy {
  cat:Cat
  constructor(
    private productService: ProductService) { }


  ngOnInit() {
   this.getCatInfo();
  }
  ngOnDestroy(){
    console.log('run destroy')
    localStorage.clear();
  }
  getCatInfo(){
    this.cat = new Cat()
    let localStorageItem = JSON.parse(localStorage.getItem('cat'));
    this.cat.CatName = localStorageItem.cat.CatName;
    this.cat.Price = localStorageItem.cat.Price;
    this.cat.ProductId = localStorageItem.cat.ProductId;
    this.cat.imageUrl = localStorageItem.cat.imageUrl;
  }

}
