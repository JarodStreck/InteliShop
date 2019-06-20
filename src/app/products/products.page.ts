import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DatabaseService} from './../services/database.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit{
  products: Observable<any[]>;
  product;
  constructor(private db: DatabaseService) {}

  ngOnInit(){
      this.db.getDatabaseState().subscribe(rdy=>{
        this.products = this.db.getProducts();
        console.log("Init db and get products")
        this.products.forEach(function (value){
          console.log(value);
       });
      })
    }


  addProduct() {
      this.db.addProduct(this.product)
      .then(_ => {
        this.product = null;
      }) .catch(e => alert(e));
    }
  deleteProduct(id){
    console.log("product id before db : " + id)
    this.db.deleteProduct(id)
  }



}
