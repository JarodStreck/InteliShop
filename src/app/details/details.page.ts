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
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
const STORAGE_KEY = 'discounts';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
    listDetail: Observable<any>;
    images = [];
  constructor(private activatedRoute: ActivatedRoute,private photoViewer: PhotoViewer,private router: Router, private ref: ChangeDetectorRef,private db: DatabaseService,private webview: WebView,private plt: Platform,private file: File,private camera: Camera,private http :HttpClient, private actionSheetController: ActionSheetController,private toastController: ToastController, private storage: Storage,private filePath: FilePath) { }

  ngOnInit() {
      //Get the route ID parameter
      this.plt.ready().then(() => {
      this.loadStoredImages();
      });
      var listId =this.activatedRoute.snapshot.paramMap.get('id');
      console.log("id:" + listId)
      //load the details of the specified list
      this.db.getDatabaseState().subscribe(rdy=>{
          this.db.loadListDetail(listId);
        this.listDetail = this.db.getListDetail();
        this.listDetail.forEach(function(element) {
          console.log(element);
        });
      })
  }
  goToDiscountDetail(id) {
        this.router.navigateByUrl('/discount-details/' + id)
    }
  showFullScreen(path){
    console.log("path : " + path)
  }
  loadStoredImages() {
   this.storage.get(STORAGE_KEY).then(images => {
     if (images) {
       console.log("img" + images);
       let arr = JSON.parse(images);
       this.images = [];
       for (let img of arr) {
         let filePath = this.file.dataDirectory + img;
         let resPath = this.pathForImage(filePath);
         this.images.push({ name: img, path: resPath, filePath: filePath });
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

async presentToast(text) {
  const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
  });
  toast.present();
}
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "Selectionner une source",
        buttons: [{
                text: 'Charger depuis la gallerie',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Prendre une nouvelle photo',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Annuler',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
}

takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
        if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
                .then(filePath => {
                    let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
        } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
        console.log("currname " + currentName);
        console.log("correctPath" + correctPath);
    });

  }
  createFileName() {
      var d = new Date(),
          n = d.getTime(),
          newFileName = n + ".jpg";
      return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
      this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
          this.updateStoredImages(newFileName);
      }, error => {
          this.presentToast('Error while storing file.');
      });
  }

  updateStoredImages(name) {
      this.storage.get(STORAGE_KEY).then(images => {
          let arr = JSON.parse(images);
          if (!arr) {
              let newImages = [name];
              this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
          } else {
              arr.push(name);
              this.storage.set(STORAGE_KEY, JSON.stringify(arr));
          }

          let filePath = this.file.dataDirectory + name;
          let resPath = this.pathForImage(filePath);

          let newEntry = {
              name: name,
              path: resPath,
              filePath: filePath
          };

          this.images = [newEntry, ...this.images];
          this.ref.detectChanges(); // trigger change detection cycle
      });
  }
  deleteImage(imgEntry, position) {
      this.images.splice(position, 1);

      this.storage.get(STORAGE_KEY).then(images => {
          let arr = JSON.parse(images);
          let filtered = arr.filter(name => name != imgEntry.name);
          this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

          var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

          this.file.removeFile(correctPath, imgEntry.name).then(res => {
              this.presentToast('File removed.');
          });
      });
  }
}
