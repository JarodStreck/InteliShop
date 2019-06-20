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
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.sqlite.create({
         name: 'data.db',
         location: 'default'
       }).then((db: SQLiteObject) => {
         this.database = db;
         this.database.executeSql('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR);')
         this.database.executeSql('CREATE TABLE IF NOT EXISTS shops (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR,localisation VARCHAR,website VARCHAR,phoneNumber INTEGER,openingHours TEXT);')
         console.log("Wtf is this not working")
         this.seedShops();
         this.loadProducts();

         this.dbReady.next(true);
     });

  }
  seedShops(){
    let data =["Migros","Chamard","www.migros.ch","022 364 22 32","Closed","Lidl","Orbe","www.lidl.ch","024 623 45 92","Closed","Migros","Orbe","www.migros.ch","022 364 22 32","Closed"]
    return this.database.executeSql('INSERT INTO shops (name,localisation,website,phoneNumber,openingHours) VALUES (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?)', data).then(data => {
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
    });
  }
  loadShops() {
    return this.database.executeSql('SELECT * FROM shops', []).then(data => {
      let shops = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          shops.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            localisation: data.rows.item(i).name,
            website: data.rows.item(i).website,
            phoneNumber: data.rows.item(i).website,
            openingHours:data.rows.item(i).openingHours
           });

        }

      }
      this.shops.next(shops);
    });
  }
  addProduct(name) {
    let data = [name]
    return this.database.executeSql('INSERT INTO products (name) VALUES (?)', data).then(data => {
      this.loadProducts();

    });
  }
  deleteProduct(id) {
    let data = [id]
      console.log("product id in db func : " + id)
  return this.database.executeSql('DELETE FROM products WHERE id = ?', data).then(data => {
    this.loadProducts();
    alert("deleted product")
  });
}
}
