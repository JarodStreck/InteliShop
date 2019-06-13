import {Storage} from '@ionic/storage'
import {Product} from '../app/model/Product';
import {Injectable} from '@angular/core'
@Injectable()
export class DataProvider {

    public storage :Storage
    public products
    public test = "test"

    init()
    {
      this.products = [
        new Product(1,"Gruyère","Gruyère AOP"),
        new Product(2,"Salami","Salami en tranche"),
        new Product(3,"Toast","Toast blé complet ")
      ]

      this.storage.set('products', this.products).then( ()=>{
        console.log('Data saved');
      })

    }
    constructor(storage: Storage){
      this.storage = storage

      this.storage.ready().then( () => {
        this.storage.get('products').then( (data)=>{
        this.products = data
        })
      })
    }
  }
