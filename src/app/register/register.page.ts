import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import { AngularFirestore} from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = '';
  password: string = '';
  cpassword: string = '';
  uid: string = '';
  type: string = '';
  displayName: string = '';
  trainerUID: string = '';
  trainerName: string = '';
  traineeSchedule: string []=[];
  insertedWeekSchedule: boolean;
  winAndLose: number;
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService,
    ) { }

  ngOnInit() {console.log(this.user)
  }

  async register()
  {
    this.type = 'trainee';
    this.insertedWeekSchedule = false;
    this.winAndLose = 0;
    const {username, password , cpassword , uid, type ,
       displayName , trainerUID , trainerName, traineeSchedule , insertedWeekSchedule ,winAndLose} = this;
    if(password !== cpassword)
    {
      alert('password dont match');
      return;
    }
    try {
      //register the trainee to the firebase auth and cloud
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username,password);
      this.uid = res.user.uid;
      this.afstore.doc(`users/${res.user.uid}`).set({
        username,
        uid,
        type,
        displayName,
        trainerUID,
        trainerName,
        traineeSchedule,
        insertedWeekSchedule,
        winAndLose

      });
      //update the firebase values
      this.afstore.doc(`users/${res.user.uid}`).update({uid: res.user.uid});
      this.afstore.doc(`users/${res.user.uid}`).update({trainerUID: this.user.getUID()});
      this.afstore.doc(`users/${res.user.uid}`).update({trainerName: this.user.getDisplayName()});
      this.afstore.doc(`privateMessages/${this.user.getUID()}-${res.user.uid}`).set({});
      const traineeUID = res.user.uid;
      const traineeName = this.displayName;
      this.afstore.doc(`users/${this.user.getUID()}`).update({
        trainees : firestore.FieldValue.arrayUnion({traineeUID , traineeName}),
      });
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
    })
    await alert.present();
  }
    //route to the login page
  goToLogin(){
    this.router.navigate(['../login']);
  }

}
