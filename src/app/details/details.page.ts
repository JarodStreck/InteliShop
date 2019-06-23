import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DatabaseService} from './../services/database.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
    listDetail: Observable<any>;
  constructor(private activatedRoute: ActivatedRoute,private router: Router, private db: DatabaseService) { }

  ngOnInit() {
      //Get the route ID parameter
      var listId =this.activatedRoute.snapshot.paramMap.get('id');
      console.log("id:" + listId)
      //load the details of the specified list
      this.db.getDatabaseState().subscribe(rdy=>{
          this.db.loadListDetail(listId);
        this.listDetail = this.db.getListDetail();
      })
  }

}
