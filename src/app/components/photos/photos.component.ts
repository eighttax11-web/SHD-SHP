import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-photos-component',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {

  @Input() photos: any;

  constructor(private storage: StorageService,
              public actionSheetController: ActionSheetController) { }

  ngOnInit() {}

  async presentActionSheet(data:any) {

    let info = this.itemTitle(data);

    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          navigator.share({
            title: data.title
          })
        }
      }, {
        text: info[1],
        icon: info[0],
        handler: () => {
          this.storage.saveDeletePhotos(data);
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    await actionSheet.onDidDismiss();

  }

  itemTitle(data: any) {
    if (this.storage.photos) {
      const exist = this.storage.photos.find(n => n.id == data.id);
      if (exist) {
        let arreglo: any[] = ["trash-outline", "Eliminar de favoritos"];
        return arreglo;
      } else {
        let arreglo: any[] = ["star-outline", "Favoritos"];
        return arreglo;
      }
    } else {
      let arreglo: any[] = ["star-outline", "Favoritos"];
      return arreglo;
    }
  }
}
