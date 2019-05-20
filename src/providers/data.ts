import {Storage} from '@ionic/storage'
import {Product} from '../app/model/Product';
export class DataProvider {

    public storage :Storage
    public product
    public test = "test"

    init()
    {
      this.products = [
        new Product("Gruyère","Gruyère AOP",1,true),
        new Product("Salami","Salami en tranche",2,false),
        new Product("Toast","Toast blé complet ",1,false)
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
