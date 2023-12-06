import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {HttpClientModule} from "@angular/common/http";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
    products: Array<Product> = [];


  constructor(private productservice:ProductService) {
  }


  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productservice.getProducts().subscribe({
      next: data => {
        this.products=data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

    handleCheckProduct(product: Product) {
        this.productservice.checkProduct(product).subscribe({
                next: updatedproduct => {
                  //product.checked=!product.checked;
                   this.getProducts();
                }
            });
    }


  handleClick(event:Event) {
    alert('Bouton cliqué !');
  }

  handleDelete(product: Product) {
    this.productservice.deleteProduct(product).subscribe({
      next:value => {
        this.getProducts();
      }
    })
  }
}
