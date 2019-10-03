import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../products/product';
import { ProductService } from '../../services/product.service';
import { Cat } from './Cat'


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  cat: Cat;
  pageTitle = 'Product List';
  imageWidth = 100;
  imageMargin = 10;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductService, private router: Router) {

  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  onBuy(product): void {
    this.cat = new Cat()
    this.cat.CatName = product.productName
    this.cat.Price = product.price
    this.cat.ProductId = product.productId
    this.cat.imageUrl = product.imageUrl
    this.productService.cat = this.cat;

    localStorage.setItem('cat', JSON.stringify({ 'cat': this.cat }));
    
    this.router.navigate(['/checkout']) 
  }

  
}
