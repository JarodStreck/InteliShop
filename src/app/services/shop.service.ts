import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
   url = 'http://localhost:8000/api/jsn/shops';
  constructor(private http: HttpClient) {}

  getShops(){
    return this.http.get('http://localhost:8000/api/jsn/shops');

  }

}
