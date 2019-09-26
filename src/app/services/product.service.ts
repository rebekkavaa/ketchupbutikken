import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ConsumerProfileRef} from '../checkout/consumerProfileRef'
import { IProduct } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';
  private options = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
})}

  constructor(private http: HttpClient) { }

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

  getCheckinUrl(): Observable<any>{
    return this.http.get<any>('https://localhost:44307/api/Checkout/GetConsumerSession').pipe(
      catchError(this.handleError)
    );
  }
  getPaymentMenuUrl(ref:string): Observable<any>{
    return this.http.post<any>('https://localhost:44307/api/Checkout/',JSON.stringify(ref),this.options).pipe(
      catchError(this.handleError)
    );
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
