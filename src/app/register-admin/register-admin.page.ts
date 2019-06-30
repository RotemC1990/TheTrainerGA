import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import { AngularFirestore} from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.page.html',
  styleUrls: ['./register-admin.page.scss'],
})
export class RegisterAdminPage implements OnInit {

  username: string = '';
  password: string = '';
  cpassword: string = '';
  type: string = '';
  displayName: string = '';
  trainerUID: string = '';
  trainerName: string = '';
  
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService
    ) { }

  ngOnInit() {
  }

  async register()
  {
    this.type = 'admin';
    const {username, password , cpassword , type , displayName , trainerUID , trainerName} = this;
    if(password !== cpassword)
    {
      alert('password dont match');
      return;
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username,password);
      this.afstore.doc(`users/${res.user.uid}`).set({
        username,
        type,
        displayName,
        trainerUID,
        trainerName

      });
      this.showAlert('Register Successful', 'Please Enter A New User');
      this.username = '';
      this.password = '';
      this.cpassword = '';
    } catch (error) {
      console.dir(error);
    }
  }
  async showAlert(header: string, message: string)
  {
    const alert = await this.alert.create({
      header,
      message,
      buttons:['Ok']
    })
    await alert.present();
  }
  goToLogin(){
    this.router.navigate(['../login']);
  }

  
}
