import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import { AngularFirestore} from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-register-trainer',
  templateUrl: './register-trainer.page.html',
  styleUrls: ['./register-trainer.page.scss'],
})
export class RegisterTrainerPage implements OnInit {

  username: string = '';
  displayName: string = '';
  password: string = '';
  cpassword: string = '';
  uid: string = '';
  type: string = '';
  trainerUID: string = '';
  trainerName: string = '';
  trainees: string[] = [];
  counterWeek: string ='';

  trainerBlockArray: boolean[]=[];
  finalSchedule: string[]=[];
  canInputSchedule: boolean=false;
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
    this.type = 'trainer';
    this.trainerBlockArray = [];
    this.finalSchedule = [];
    this.canInputSchedule =false;
    this.counterWeek='';
    const {username,  password , cpassword , uid, type , displayName,
          trainerUID , trainerName, trainees , trainerBlockArray ,
          finalSchedule , canInputSchedule , counterWeek } = this;
    if(password !== cpassword)
    {
      alert('password dont match');
      return;
    }
    try {
      //register the trainer to the firebase auth and cloud
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);
      this.uid = res.user.uid;
      this.afstore.doc(`users/${res.user.uid}`).set({
        username,
        uid,
        type,
        displayName,
        trainerUID,
        trainerName,
        trainees,
        trainerBlockArray,
        finalSchedule,
        canInputSchedule,
        counterWeek,


      });
      //update the firebase values
      this.afstore.doc(`users/${res.user.uid}`).update({uid: res.user.uid});
      this.afstore.doc(`publicMessages/${res.user.uid}`).set({});
      this.afstore.doc(`posts/${this.user.getUID()}`).set({});


      this.showAlert('Register Successful', 'Please Enter New User');
      //clean the values in the page after registertion
      this.username = '';
      this.password = '';
      this.cpassword = '';
      this.displayName = '';
    } catch (error) {
      console.dir(error);
    }
  }
  //function that show an alert
  async showAlert(header: string, message: string)
  {
    const alert = await this.alert.create({
      header,
      message,
      buttons:['Ok']
    });
    await alert.present();
  }
  //route to the login page
  goToLogin() {
    this.router.navigate(['../login']);
  }

}
