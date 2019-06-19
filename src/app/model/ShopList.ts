import {ShopListProduct} from '../model/ShopListProduct';
export class ShopList{

  public id :number
  public shoplistproducts :ShopListProduct
  public state :number


  constructor(id :number,shoplistproducts :ShopListProduct,state :number){
    this.shoplistproducts = shoplistproducts
    this.state = state
  }

}
