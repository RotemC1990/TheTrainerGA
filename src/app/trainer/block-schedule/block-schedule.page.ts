import { Component, OnInit } from '@angular/core';
import { WeekDay, formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Local } from 'protractor/built/driverProviders';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-block-schedule',
  templateUrl: './block-schedule.page.html',
  styleUrls: ['./block-schedule.page.scss'],
})
export class BlockSchedulePage implements OnInit {

  constructor(private alertCtrl: AlertController, private afstore: AngularFirestore,
    private user: UserService, private alert: AlertController,
    private router: Router) {}

ngOnInit() {
}


  matrix = new Array(15).fill(undefined).map(() => new Array(7).fill(undefined));
  matrixToFirebase = new Array(16).fill(undefined).map(() => new Array(7).fill(undefined));
  blockArray = new Array(98).fill(true);
  placeInArray=0;
  editEntryValue(event: any, rowIndex: number, colIndex: number): void {
    this.placeInArray = (rowIndex - 1) + (colIndex * 14);
    if (this.blockArray[this.placeInArray] == false) {
      this.blockArray[this.placeInArray] = true;
    } else {
      this.blockArray[this.placeInArray] = false;
    }
  

    this.matrixToFirebase[colIndex][rowIndex];//לעלות את זה לפיירבייס מתאמן
}
  
  viewTitle=new Date().toLocaleString() ;
     
 
  d1=this.matrix[0][5]="Fri"
  d2=this.matrix[0][4]="Thu"
  d3=this.matrix[0][3]="Wed"
  d4=this.matrix[0][2]="Tue"
  d5=this.matrix[0][1]="Mon"
  d6=this.matrix[0][0]="Sun"
  d7=this.matrix[0][7]="D/H"
  d0=this.matrix[0][6]="Sat"



h8=this.matrix[1][7]="08:00"
h9=this.matrix[2][7]="09:00"
h10=this.matrix[3][7]="10:00"
h11=this.matrix[4][7]="11:00"
h12=this.matrix[5][7]="12:00"
h13=this.matrix[6][7]="13:00"
h14=this.matrix[7][7]="14:00"
h15=this.matrix[8][7]="15:00"
h16=this.matrix[9][7]="16:00"
h17=this.matrix[10][7]="17:00"
h18=this.matrix[11][7]="18:00"
h19=this.matrix[12][7]="19:00"
h20=this.matrix[13][7]="20:00"
h21=this.matrix[14][7]="21:00"



  viewSubTitle=new Date().toLocaleDateString()//+"אנא הכניסו תאריכים לשבוע שמתחיל ב:"



  Confirm() {
    this.afstore.doc(`users/${this.user.getUID()}`).update({trainerBlockArray: this.blockArray});
    this.afstore.doc(`users/${this.user.getUID()}`).update({canInputSchedule: true});
    this.showAlert('Done!', 'The Schedule sended to the trainers');
    
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['trainer']);
        }
      }]
    });
    await alert.present();
  }



}
