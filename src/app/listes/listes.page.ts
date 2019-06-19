import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-listes',
  templateUrl: './listes.page.html',
  styleUrls: ['./listes.page.scss'],
})
export class ListesPage implements OnInit {

  constructor(private router: Router){

  }
  myBackButton(){
    this.router.navigate(['home']);
  }
  ngOnInit() {
  }

}
