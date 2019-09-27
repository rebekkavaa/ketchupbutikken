import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public pageTitle = 'Welcome';

    constructor(private route: ActivatedRoute,
              private router: Router,
  ) {
  }

  onEnter(): void {
    this.router.navigate(['/products']);
  }
  onPurchase(): void {
    this.router.navigate(['/checkout']);
  }
  
 
}
