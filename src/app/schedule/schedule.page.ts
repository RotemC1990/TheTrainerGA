import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { WeekDay, formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Local } from 'protractor/built/driverProviders';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

 
  // tds = document.getElementsByTagName("td");
  scheduleToFirebase: string[];
  numOfOptions: number;
  blockArray: boolean[];
  matrix = new Array(15).fill(undefined).map(() => new Array(7).fill(undefined));
  myNumOfTrainings: string;


  editEntryValue(event: any, rowIndex: number, colIndex: number): void {
    if(this.scheduleToFirebase[(rowIndex - 1) + (colIndex * 14)] == '-1') {
      this.scheduleToFirebase[(rowIndex - 1) + (colIndex * 14)] = '0';
      this.numOfOptions++;
    }
    else {
      this.scheduleToFirebase[(rowIndex - 1) + (colIndex * 14)] = '-1';
      this.numOfOptions--;
    }
}

  viewTitle=new Date().toLocaleString();


  d1=this.matrix[0][5]="Fri";
  d2=this.matrix[0][4]="Thu";
  d3=this.matrix[0][3]="Wed";
  d4=this.matrix[0][2]="Tue";
  d5=this.matrix[0][1]="Mon";
  d6=this.matrix[0][0]="Sun";
  d7=this.matrix[0][7]="D/H";
  d0=this.matrix[0][6]="Sat";



h8=this.matrix[1][7]="08:00";
h9=this.matrix[2][7]="09:00";
h10=this.matrix[3][7]="10:00";
h11=this.matrix[4][7]="11:00";
h12=this.matrix[5][7]="12:00";
h13=this.matrix[6][7]="13:00";
h14=this.matrix[7][7]="14:00";
h15=this.matrix[8][7]="15:00";
h16=this.matrix[9][7]="16:00";
h17=this.matrix[10][7]="17:00";
h18=this.matrix[11][7]="18:00";
h19=this.matrix[12][7]="19:00";
h20=this.matrix[13][7]="20:00";
h21=this.matrix[14][7]="21:00";



  viewSubTitle=new Date().toLocaleDateString(); //+"אנא הכניסו תאריכים לשבוע שמתחיל ב:"

  constructor(private alertCtrl: AlertController, private user: UserService ,private router: Router ,
    private route: ActivatedRoute, public afstore: AngularFirestore , private alert: AlertController) {
   }

  ngOnInit() {
    
    this.blockArray = this.user.traineeGetTrainerBlockArray();
    this.numOfOptions = 0;
    this.scheduleToFirebase = new Array(101).fill('-1');
    this.scheduleToFirebase[100] = this.user.getDisplayName();
    this.myNumOfTrainings = this.route.snapshot.paramMap.get('numOfTrainings');
    this.scheduleToFirebase[98] = this.myNumOfTrainings;
  }

  Confirm() {
    let countTrainingsDaysArray = new Array(7);
    countTrainingsDaysArray.fill(0);

    for (let i = 0; i < 98 ; i++) {
      if (this.scheduleToFirebase[i] == '0') {
        countTrainingsDaysArray[Math.floor(i / 14)] = 1;
      }
    }
    let countTrainingsDay = 0;
    for (let i = 0; i < 7 ; i++) {
      if (countTrainingsDaysArray[i] == 1) {
        countTrainingsDay++;
      }
    }
    if(countTrainingsDay < Number(this.myNumOfTrainings)) {
      this.showErrorAlert('Error!', 'There is not enough training days');
    } else {
      this.scheduleToFirebase[99] = this.numOfOptions.toString();
    this.afstore.doc(`users/${this.user.getUID()}`).update({insertedWeekSchedule: true});
    this.afstore.doc(`users/${this.user.getUID()}`).update({traineeSchedule:  this.scheduleToFirebase});
    this.showAlert('Done!', 'The Schedule Send To Your Trainer');
    }

    
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['trainee']);
        }
      }]
    });
    await alert.present();
  }


async showErrorAlert(header: string, message: string) {
  const alert = await this.alert.create({
    header,
    message,
    buttons: ['OK']
  });
  await alert.present();
}

}
