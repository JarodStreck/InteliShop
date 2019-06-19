import { ShopService} from '../services/shop.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.page.html',
  styleUrls: ['./shops.page.scss'],
})
export class ShopsPage implements OnInit {
  shops: Observable<any>;
  shopData: String;
  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.shops = this.shopService.getShops();
    this.shops.subscribe(shops =>{
      this.shopData = shops.data;
      console.log(this.shopData)
      return this.shopData
    }),err => console.error('Observable error :' + err)
  }

}
