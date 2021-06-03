import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();

  response: Response[] = [];

  constructor(private _userService: UserService,
              private router: Router,
              private storage: StorageService,
              public toastController: ToastController,
              public alertController: AlertController ) { }

  ngOnInit() {
  }

  login(form: NgForm) {

    this._userService.login(this.user).subscribe(
      (resp: any) => {

        this.response = resp
        
        if (this.response.length > 0) {
          
          this.storage.saveUser(this.response[0]);
          this.router.navigateByUrl('albums');
          this.presentToast();
          console.log(this.response[0]);

        } else {
          console.log('Invalid login');
          this.presentAlert();
        }
      }, error => {
        this.presentAlert();
      }
    )
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Inicio de sesión correcto.',
      duration: 2000
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Invalid login.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}