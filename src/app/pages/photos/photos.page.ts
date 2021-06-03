import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService } from 'src/app/services/albums.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  photos: any;

  constructor(private router: ActivatedRoute,
              private albums: AlbumsService) { }

  ngOnInit() {

    let id = this.router.snapshot.paramMap.get('id');
    this.albums.getPhotos(id).subscribe(
      resp => {
        this.photos = resp;
      }
    )
  }
}