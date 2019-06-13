import { Component } from '@angular/core';
import {DataProvider} from '../../providers/data'
import {Storage} from '@ionic/storage'
import {Product} from '../model/Product';
import {Router} from '@angular/router';

import { DatabaseService} from '../services/database.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public title: string
  public data: DataProvider


  constructor(private db:DatabaseService ,private router :Router , private storage :Storage,dataprovider: DataProvider){
    this.data =  dataprovider

  }
  golistes() {
    this.router.navigate(['listes']);
  }
  goproducts() {
    this.router.navigate(['products']);
  }
  goshops() {
    this.router.navigate(['shops']);
  }
  initDB(){
    this.data.init();
  }
}
