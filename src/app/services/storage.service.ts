import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  user: Response; 

  userLocal: any;

  photos: any;

  constructor(private storage: Storage) {
    this.init();
    this.getPhotos();
  }

  saveUser(user) {
    this.user = user;
    this.set('user', this.user);
  }

  // Revisar
  saveDeletePhotos(photo) {
    if(this.photos) {
      const exist = this.photos.find(n => n.id == photo.id);
      if(!exist) {
        this.photos.unshift(photo)
        this.set('Photos', this.photos)
      } else {
        this.remove(photo);
      }
    } else {
      this.photos = [];
      this.photos.unshift(photo);
      this.set('Photos', this.photos);
    }
  }

  remove(photo: any) {
    this.photos = this.photos.filter(n => n.id !== photo.id);
    this.set('Photos', this.photos);
  }

  async getPhotos() {
    const photosLocal = await this.storage.get('Photos');
    this.photos = photosLocal;
  }

  async logout() {
    await this.storage.remove('user');
    await this.storage.remove('Photos');
  }

  //

  async getUser() {
    const user = await this.storage.get('user');

    this.userLocal = user;
  }
  
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
}
