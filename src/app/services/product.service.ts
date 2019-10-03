import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IProduct } from '../products/product';
import { Cat } from '../shared/productlist/Cat';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';
  cat:Cat
  
  constructor(private http: HttpClient) {
    this.cat = new Cat()
    
   }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }
  getCat(){
    let localStorageItem = JSON.parse(localStorage.getItem('cat'));
    return localStorageItem === null ? [] : localStorageItem;
    
  }

  getCheckinUrl(): Observable<any>{
    return this.http.get<any>('https://localhost:44307/api/Checkout/GetConsumerSession').pipe(
      catchError(this.handleError)
    );
  }
  postCatInfo(cat:Cat): Observable<any>{
    return this.http.post<any>('https://localhost:44307/api/Checkout/GetCatOrder',cat)
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
