import { ProductSell } from './../model/interfaces';
import { apiUrl } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  save(userId: number, product: Product) {
    return this.http.post(`${apiUrl}/product/${userId}/save`, product);
  }

  update(product: Product) {
    return this.http.put(`${apiUrl}/product/${product.id}`, product);
  }

  delete(productId: number) {
    return this.http.delete(`${apiUrl}/product/${productId}`);
  }

  sell(productId: number, productSell: ProductSell) {
    return this.http.post(`${apiUrl}/product/${productId}/sell`, productSell);
  }
}
