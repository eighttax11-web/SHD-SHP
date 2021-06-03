import { Component, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/services/albums.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private _albumsService: AlbumsService,
              private _storage: StorageService) {}
}
