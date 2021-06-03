import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumsService } from 'src/app/services/albums.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {

  albums: any;

  constructor(private storage: StorageService, private albumsService: AlbumsService, private router: Router) { }

  ngOnInit() {
    this.storage.getUser().then(
      resp => {
        let user = this.storage.userLocal;
        this.albumsService.getAlbumsByUserId(user.id).subscribe(
          resp => {
            this.albums = resp;
            console.log(this.albums);
          }
        )
      }
    )
  }

  getAlbumById(data: any) {
    this.router.navigateByUrl(`photos/${data.id}`)
  }

}
