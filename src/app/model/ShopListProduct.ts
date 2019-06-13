import {Product} from '../model/Product';
import {Shop} from '../model/Shop';
export class ShopListProduct{

  public id :number
  public product :Product
  public quantity :number
  public order :number
  public isBought :boolean
  public shop :Shop

  constructor(id :number,product :Product,quantity :number,order :number,isBought :boolean,shop :Shop){
    this.product = product
    this.quantity = quantity
    this.order = order
    this.isBought = isBought
    this.shop = shop
  }

}
