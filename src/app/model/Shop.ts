export class Shop{

  public id :number
  public name :string
  public localisation :string
  public website :string
  public phoneNumber :number
  public openingHours :string

  constructor(id :number,name :string,localisation :string,website :string,phoneNumber :number,openingHours : string){
    this.id = id
    this.name = name
    this.localisation = localisation
    this.website = website
    this.phoneNumber = phoneNumber
    this.openingHours = openingHours
  }

}
