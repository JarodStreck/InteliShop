import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DatabaseService} from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit{
    products: Observable<any[]>;
    product;
    constructor(private db: DatabaseService,public alertController: AlertController) {}

    ngOnInit(){
        this.db.getDatabaseState().subscribe(rdy=>{
            this.products = this.db.getProducts();
        });
    }
    //Add a new product . if nothing is writed in the input , display an alert message
    addProduct() {
        if(this.product == null)
        {
            this.presentAlert();
        }
        else{
            this.db.addProduct(this.product).then(_ => {
                this.product = null;
            }) .catch(e => console.log(e));
        }
    }
    // Call the database function to remove a product
    deleteProduct(id){
        console.log("product id before db : " + id)
        this.db.deleteProduct(id)
    }
    //Generate an alert message
    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Erreur',
            subHeader: 'Le produit n\'a pas été ajouté',
            message: 'Le nom du produit ne peux pas ètre vide.',
            buttons: ['OK']
        });
        await alert.present();
    }

}
