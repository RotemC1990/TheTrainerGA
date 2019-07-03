import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  type = '';
  username: string = '';
  password: string = '';
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public alert: AlertController,
    public user: UserService,
    private afs: AngularFirestore
    ) { }

  ngOnInit() {
  }
  //login the user
  async login(){
    const {username, password} = this;
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username,password)

      if (res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid,
          displayName: res.user.displayName,
          trainerName: res.user.trainerName,
          trainerUID: res.user.trainerUID,
          type: res.user.type,
          trainees: [],
          trainerBlockArray : res.user.trainerBlockArray,
          finalSchedule: res.user.finalSchedule,
          canInputSchedule: res.user.canInputSchedule,
          scheduleToAlgorithem: res.user.scheduleToAlgorithem,
          traineeSchedule: res.user.traineeSchedule,
          insertedWeekSchedule: res.user.insertedWeekSchedule,
          winAndLose: res.user.winAndLose,
        });
        await this.user.getLoggedInUser().then(() => {
          this.type = this.user.getUserType();

        }
        );
        //route the page by the user type
        if(this.type == 'admin') {
          this.router.navigate(['admin']);
        }
         if(this.type == 'trainer')
        {
          this.router.navigate(['trainer']);
        }
         if(this.type == 'trainee') {
          this.router.navigate(['trainee']);
        }
      }
    } catch (error) {
      if (error.code === 'auth/operation-not-allowed') {
        this.showAlert('Error', 'User not found');
      } else if (error.code === 'auth/user-not-found') {
        this.showAlert('Error', 'User not found');
      } else if (error.code === 'auth/invalid-email') {
        this.showAlert('Error', 'invalid-email');
      } else if (error.code === 'auth/wrong-password') {
        this.showAlert('Error', 'Wrong Password');
      }

    }
  }
  //function that show an alert
  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
