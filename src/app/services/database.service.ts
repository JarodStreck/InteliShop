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

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.database.executeSql('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR);')
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
          this.loadProducts();
          this.dbReady.next(true);
      })
      .catch(e => console.log(e));
    }
  getDatabaseState() {
    return this.dbReady.asObservable();
  }
  getProducts(): Observable<any[]> {
    return this.products.asObservable();
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
           alert(products[i].id  + "/" + products[i].name)
        }

      }
      this.products.next(products);
    });
  }
  addProduct(name) {
    let data = [name]
  return this.database.executeSql('INSERT INTO products (name) VALUES (?)', data).then(data => {
    this.loadProducts();
  }).catch(e => alert(e));
}
}
