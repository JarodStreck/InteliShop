import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DatabaseService} from './../services/database.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-createlist',
  templateUrl: './createlist.page.html',
  styleUrls: ['./createlist.page.scss'],
})
export class CreatelistPage implements OnInit {
  products: Observable<any[]>;
  shops: Observable<any[]>;
  name;
  date;
  checked = [];
  constructor(private db: DatabaseService,private router: Router) {}

  ngOnInit(){
    this.db.getDatabaseState().subscribe(rdy=>{
      this.products = this.db.getProducts();
    })
  }
  // Get value of multiple checkbox isn't something native in ionic. This function build an array of only the selected checkbox
  buildCheckedProduct(event, checkbox : String) {
      if(!this.checked.includes(checkbox))
      {
          this.checked.push(checkbox);
      }
      else{
        let index = this.checked.indexOf(checkbox)
        this.checked.splice(index,1);
      }
      //console.log("is check " + event.checked + "chk value " + checkbox);
      //console.log(this.checked)

  }

  //Call the database function to add a new list
  addList(){
    this.db.addList(this.name,this.checked).then(_ => {
      this.router.navigate(['lists']);
    }) .catch(e => alert(e));;

  }
}
