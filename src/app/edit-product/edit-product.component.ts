import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {NgIf} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})

export class EditProductComponent implements OnInit{
  productId! : number;
  productFormGroup! :FormGroup;
  productService! :ProductService;
  constructor(private activateRoute: ActivatedRoute, private ps: ProductService, private fb: FormBuilder) {
    this.productService = ps;
  }

  ngOnInit() {
    this.productId=this.activateRoute.snapshot.params['id'];
    this.ps.getProductById(this.productId).subscribe({
      next:(product)=>{
        this.productFormGroup=this.fb.group({
          id:this.fb.control(product.id),
          name:this.fb.control(product.name,[Validators.required]),
          price:this.fb.control(product.price,[Validators.min(100)]),
          checked:this.fb.control(product.checked),
        });
      },
      error: error =>{
        console.log(error)
      }
    });
  }

  updateProduct() {
    let product: Product=this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next:data=>{
        alert(JSON.stringify(data));
      }
    })


    }

}
