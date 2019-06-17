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

        }

      }
      this.products.next(products);
    });
  }
  addProduct(name) {
    let data = [name]
  return this.database.executeSql('INSERT INTO products (name) VALUES (?)', data).then(data => {
    this.loadProducts();
  });
}
}
