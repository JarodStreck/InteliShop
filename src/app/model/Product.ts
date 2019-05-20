export class Product{

  public name: string
  public description: string
  public order: number
  public isBought: boolean

  constructor(name :string,description :string,order :number,isBought :boolean){
    this.name = name
    this.description = description
    this.order = order
    this.isBought = isBought
  }

}
