import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  constructor(private storage: StorageService,
              private route: Router) { }

  ngOnInit() {}

  logout() {
    this.storage.logout().then(
      resp => {
        this.route.navigateByUrl('login');
      }
    )
  }

  favoritos() {
    this.route.navigateByUrl('favoritos');
  }

}
