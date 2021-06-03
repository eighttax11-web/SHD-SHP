import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PhotosComponent } from './photos/photos.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [PhotosComponent, HeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PhotosComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
