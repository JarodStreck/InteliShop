import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DatabaseService} from './../services/database.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-listes',
  templateUrl: './listes.page.html',
  styleUrls: ['./listes.page.scss'],
})
export class ListesPage implements OnInit {
  lists: Observable<any>;
  constructor(private router: Router, private db: DatabaseService){}

  createListPage(){
    this.router.navigate(['createlist']);
  }

  goToListDetail(id) {
        this.router.navigateByUrl('/lists/' + id)
    }
  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy=>{
      this.lists = this.db.getLists();
    })
  }
  deleteList(id){
    console.log("product id before db : " + id)
  }

}
