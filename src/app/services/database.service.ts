import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  products = new BehaviorSubject([]);
  shops = new BehaviorSubject([]);
  lists = new BehaviorSubject([]);
  listDetail = new BehaviorSubject([]);
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.sqlite.create({
         name: 'data.db',
         location: 'default'
       }).then((db: SQLiteObject) => {
         this.database = db;
         this.database.executeSql('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR);').then(res => console.log('Create products')).catch(e => {console.log("Failed product " + JSON.stringify(e) )});
         this.database.executeSql('CREATE TABLE IF NOT EXISTS shops(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR,localisation VARCHAR,website VARCHAR,phoneNumber VARCHAR,openingHours TEXT);').then(res => console.log('Create shops')).catch(e => {console.log("Failed shops " + JSON.stringify(e) )});
         this.database.executeSql('CREATE TABLE IF NOT EXISTS lists(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR,createdAt DATE,state INTEGER,shop_id INTEGER, FOREIGN KEY(shop_id) REFERENCES shops(id) );').then(res => console.log('Create lists')).catch(e => {console.log("Failed lists " + JSON.stringify(e) )});
         this.database.executeSql('CREATE TABLE IF NOT EXISTS lists_products (id INTEGER PRIMARY KEY AUTOINCREMENT,product_id INTEGER ,list_id INTEGER,FOREIGN KEY(product_id) REFERENCES products(id),FOREIGN KEY(list_id) REFERENCES lists(id) );').then(res => console.log('Create product_list ')).catch(e => {console.log("Failed product_list " + JSON.stringify(e) )});
         this.database.executeSql('CREATE TABLE IF NOT EXISTS discount (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR,imagePath VARCHAR,shop_id INTEGER,FOREIGN KEY(shop_id) REFERENCES shops(id) );').then(res => console.log('Create discount')).catch(e => {console.log("Failed discount " + JSON.stringify(e) )});
         console.log("Wtf is this not working")
         this.seedShops();
         this.loadProducts();
         this.loadShops();
         this.loadLists();

         this.dbReady.next(true);
     }) .catch(error =>  console.log("Error create db" + JSON.stringify(error)));

  }
  seedShops(){
    let data =["Migros","Chamard","www.migros.ch","022/364/04/28","Closed","Aldi","Orbe","www.aldi.ch","022/364/04/28","Closed"]

    this.database.executeSql('DELETE FROM shops ');
    return this.database.executeSql('INSERT INTO shops (name,localisation,website,phoneNumber,openingHours) VALUES (?,?,?,?,?),(?,?,?,?,?)', data).then(data => {
       this.loadShops();

    });
  }
  getDatabaseState() {
    return this.dbReady.asObservable();
  }
  getProducts(): Observable<any[]> {
    return this.products.asObservable();
  }
  getShops(): Observable<any[]> {
    return this.shops.asObservable();
  }
  getLists(): Observable<any[]> {
    return this.lists.asObservable();
  }
  getListDetail(): Observable<any[]>{
      return this.listDetail.asObservable();
  }
  loadProducts() {
    return this.database.executeSql('SELECT * FROM products', []).then(data => {
      let products = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          products.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name
           });

        }

      }
      this.products.next(products);
    }) .catch(error => console.log("Error select form product " + JSON.stringify(error)));
  }

  loadShops() {
    return this.database.executeSql('SELECT * FROM shops', []).then(data => {
      let shops = [];
      let products =[];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          shops.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              localisation: data.rows.item(i).localisation,
              website: data.rows.item(i).website,
              phoneNumber: data.rows.item(i).phoneNumber,
              openingHours:data.rows.item(i).openingHours
          });
      }

      }
      this.shops.next(shops);

    }).catch(error => console.log("Error select from shop " + JSON.stringify(error)));
  }
  //Load the data of all list and store them in an Observable
  loadLists() {
    return this.database.executeSql('SELECT * FROM lists', []).then(data => {
      let lists = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          lists.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            createdAt: data.rows.item(i).createdAt,
            state: data.rows.item(i).state,
            shop_id: data.rows.item(i).shop_id
           });

        }

      }
      this.lists.next(lists);
    }).catch(error => console.log("Error select from shop " + JSON.stringify(error)));

  }
  //Load the details of a list and store them in an Observable
loadListDetail(id){
    return this.database.executeSql('SELECT name,createdAt FROM lists WHERE lists.id = ?', [id]).then(data => {
      let listDetail = [];
       console.log("nb list" + data.rows.length)
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          listDetail.push({
            name: data.rows.item(i).name,
            createdAt: data.rows.item(i).createdAt,
           });

        }

      }
      this.listDetail.next(listDetail);
      console.log("list detail : " + listDetail)
  }).catch(error => console.log("Error select from shop " + JSON.stringify(error)));

}
    //Add a product in the database
  addProduct(name) {
    let data = [name]
    return this.database.executeSql('INSERT INTO products (name) VALUES (?)', data).then(data => {
      this.loadProducts();

  }).catch(error => console.log("Error insert new product" + JSON.stringify(error)));
  }
  //Delete a product in the database
  deleteProduct(id) {
    let data = [id]
    return this.database.executeSql('DELETE FROM products WHERE id = ?', data).then(data => {
        this.loadProducts();

    }).catch(error => console.log("Error delete product" + JSON.stringify(error)));
  }
  // Add a new list and his product. [Work in progress]
  addList(name,products){
      let data = [name,0,1]
      console.log(data)
      return this.database.executeSql("INSERT INTO lists (name,createdAt,state,shop_id) VALUES (?,(SELECT strftime('%m/%d/%Y', 'now', 'localtime')),?,?)",data).then(data =>{
          /*products.forEach(function(element){
               this.database.executeSql("INSERT INTO lists_products (product_id,(SELECT MAX(id))) VALUES (?)",[element]).then(data =>{
               }).catch(error =>{
                   console.log("Error in insert list_product item :" + JSON.stringify(error))
               });
          })*/
          this.loadLists();
      }).catch(error => {
        console.log("Error in insert into lists : "  + JSON.stringify(error))
      });
  }
}
