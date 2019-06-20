import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DatabaseService} from './../services/database.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-createlist',
  templateUrl: './createlist.page.html',
  styleUrls: ['./createlist.page.scss'],
})
export class CreatelistPage implements OnInit {
  products: Observable<any[]>;
  shops: Observable<any[]>;
  name;
  date;
  productsInList;
  shop;
  constructor(private db: DatabaseService) {}

  ngOnInit(){
      this.db.getDatabaseState().subscribe(rdy=>{
        this.shops = this.db.getShops();
        this.products = this.db.getProducts();
        console.log("Init db and get shops")
      })
    }

}
