import { Component } from '@angular/core';
import {DataProvider} from '../../providers/data'
import {Storage} from '@ionic/storage'
import {Product} from '../model/Product';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public title: string
  public data: DataProvider

  constructor(private storage :Storage){
    this.data = new DataProvider(storage)

  }

  initDB(){
    this.data.init();
  }
}
