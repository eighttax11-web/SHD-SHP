import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  url: string = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) { }

  getAlbumsByUserId(id: string) {
    return this.http.get(`${ this.url }albums?userId=${ id }`);
  }

  getPhotos(id: string) {
    return this.http.get(`${ this.url }photos?albumId=${ id }`);
  }
}
