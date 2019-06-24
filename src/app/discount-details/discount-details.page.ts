import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DatabaseService} from './../services/database.service';
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

const STORAGE_KEY = 'discounts';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.page.html',
  styleUrls: ['./discount-details.page.scss'],
})
export class DiscountDetailsPage implements OnInit {
  image;
  imgID;
  constructor(private activatedRoute: ActivatedRoute,private router: Router, private ref: ChangeDetectorRef,private db: DatabaseService,private webview: WebView,private plt: Platform,private file: File,private camera: Camera,private http :HttpClient, private actionSheetController: ActionSheetController,private toastController: ToastController, private storage: Storage,private filePath: FilePath) { }


  ngOnInit() {
    this.imgID =this.activatedRoute.snapshot.paramMap.get('id');
    console.log("img id" + this.imgID);
    this.loadClickedImage();
  }

  loadClickedImage() {
   this.storage.get(STORAGE_KEY).then(images => {
     if (images) {
       console.log("img" + images);
       let arr = JSON.parse(images);
       for (let img of arr) {
         let filePath = this.file.dataDirectory + img;
         let resPath = this.pathForImage(filePath);
         if(this.imgID == img)
         {
            this.image = { name: img, path: resPath, filePath: filePath };
            return;
         }

       }
     }
   });
 }
 pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    let converted = this.webview.convertFileSrc(img);
    return converted;
  }
}
}
