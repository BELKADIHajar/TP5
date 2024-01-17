import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgClass, NgForOf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {HttpClientModule} from "@angular/common/http";
import {Product} from "../model/product.model";
import {FormsModule} from "@angular/forms";
import {identity} from "rxjs";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    FormsModule,
    NgClass,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
    products: Array<Product> = [];
    public keyword:String="";
    totalPages:number=0;
    pageSize:number=3;
    currentPage:number=1;
  constructor(private productservice:ProductService,
    private  router:Router, public appState : AppStateService) {
  }


  ngOnInit() {
    this.searchProducts();
  }

  searchProducts(){
    this.appState.setProductState({
      status:"LOADING"
    });
    this.productservice.searchProducts(this.appState.productsState.keyword,this.appState.productsState.currentPage,this.appState.productsState.pageSize).subscribe({
      next: (resp )=> {
        let products = resp.body as Array<Product>;
        let totalProducts = parseInt(resp.headers.get('X-Total-Count')!);
        let totalPages = Math.ceil(totalProducts / this.appState.productsState.pageSize);
        this.appState.setProductState({
          products : products,
          totalProducts : totalProducts,
          totalPages : totalPages,
          status :"LOADED"
        })      },
      error: (err) => {
        console.log(err)
      }
    })
  }

    handleCheckProduct(product: Product) {
        this.productservice.checkProduct(product).subscribe({
                next: updatedproduct => {
                  //product.checked=!product.checked;
                   this.searchProducts();
                }
            });
    }


  handleClick(event:Event) {
    alert('Bouton cliqué !');
  }

  handleDelete(product:Product) {
    this.productservice.deleteProduct(product).subscribe({
      next:value => {
        this.searchProducts();
      }
    })
  }
/*
  searchProducts(){
    this.currentPage=1;
    this.totalPages=0;
    this.productservice.searchProducts(this.keyword,this.currentPage,this.pageSize).subscribe({
      next:value => {this.products=value;}
    })
  }*/

  handleGoToPage(page: number) {
    this.appState.productsState.currentPage=page;
    this.searchProducts();
  }

  protected readonly identity = identity;

  handleEdit(product: Product) {
      this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
