import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public searchProducts(keyword:String,page: number=1, size: number=3){
    return this.http.get<Array<Product>>(`http://localhost:3000/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'});
  }

  public checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`http://localhost:3000/products/${product.id}`,
      { checked: !product.checked });
  }

  public deleteProduct(product:Product){
    return this.http.delete(`http://localhost:3000/products/${product.id}`).pipe(
      tap(() => console.log('Requête HTTP delete réussie')));
  }

    public saveProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`http://localhost:3000/products`, product);
    }


/*
  public searchProducts(keyword: String, currentPage: number, pageSize: number): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:3000/products?name_like=${keyword}&_page=${currentPage}&_limit=${pageSize}`);
  }*/

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/products/${productId}`);
  }

  updateProduct(product: Product): Observable<Product> {
      return this.http.put<Product>(`http://localhost:3000/products/${product.id}`,product);
    }
}

