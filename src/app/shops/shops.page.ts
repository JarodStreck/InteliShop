import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DatabaseService} from './../services/database.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-shops',
  templateUrl: './shops.page.html',
  styleUrls: ['./shops.page.scss'],
})
export class ShopsPage implements OnInit {
  shops: Observable<any>;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy=>{
      this.shops = this.db.getShops();
      console.log("Init db and get shops")
      this.shops.forEach(function (value){
        console.log(value);
     });
    })
  }

}
