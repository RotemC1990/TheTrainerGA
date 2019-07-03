import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';
import { UserService } from 'src/app/user.service';
import { AngularFirestore} from '@angular/fire/firestore';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-calculate-schedule',
  templateUrl: './calculate-schedule.page.html',
  styleUrls: ['./calculate-schedule.page.scss'],
})
export class CalculateSchedulePage implements OnInit {

  messageText: string;
    messages: Array<any>;
    socket: SocketIOClient.Socket;


  scheduleUidToCalculate: string[];
  traineesSchedule: string[][];
  location: number;
  trainerTrainees: any[];
  traineesUnsubscribe: string[];
  showTrainees: boolean;
  arrayToServer: string;
  
  scheduleToFB: string[]
  finleschedule = new Array(15).fill(undefined).map(() => new Array(7).fill(undefined));
  queue = new Array(15).fill([]).map(() => new Array(7).fill([]));
  randomArray =new Array(98)
   webSocket

    Q1=[];
    Qmin =[]
    Qmin2=[];
    Q2=[];
    Qdeficiency=[];
    fewtrainee=[];
   trainees=[];

  HumanGrade:any
  nambersOftTainees:any
  StandardDeviation:any
  day:0

  constructor(private alertCtrl: AlertController,public navCtrl: NavController,
              private user: UserService, public afs: AngularFirestore , private alert: AlertController) {}

  async ngOnInit() {
    this.traineesUnsubscribe = await this.user.getScheduleNameThatNotInserted(this.user.getUID());
    if(this.traineesUnsubscribe.length>0) {
      this.showTrainees = true;
    } else {
      this.showTrainees = false;
    }
    //connect to the server
    this.webSocket = new WebSocket("ws://rotemcohen.ddns.net:8090/example/hello");
  }



init()
{
this.finleschedule[0][5]="fri"
this.finleschedule[0][4]="thu"
this.finleschedule[0][3]="wed"
this.finleschedule[0][2]="tue"
this.finleschedule[0][1]="mon"
this.finleschedule[0][0]="sun"
this.finleschedule[0][7]="d/h"
this.finleschedule[0][6]="sat"

this.finleschedule[1][7]="08:00"
this.finleschedule[2][7]="09:00"
this.finleschedule[3][7]="10:00"
this.finleschedule[4][7]="11:00"
this.finleschedule[5][7]="12:00"
this.finleschedule[6][7]="13:00"
this.finleschedule[7][7]="14:00"
this.finleschedule[8][7]="15:00"
this.finleschedule[9][7]="16:00"
this.finleschedule[10][7]="17:00"
this.finleschedule[11][7]="18:00"
this.finleschedule[12][7]="19:00"
this.finleschedule[13][7]="20:00"
this.finleschedule[14][7]="21:00"
this.finleschedule[15][7]="22:00"

this.queue[0][5]="fri"
this.queue[0][4]="thu"
this.queue[0][3]="wed"
this.queue[0][2]="tue"
this.queue[0][1]="mon"
this.queue[0][0]="sun"
this.queue[0][7]="d/h"
this.queue[0][6]="sat"

this.queue[1][7]="08:00"
this.queue[2][7]="09:00"
this.queue[3][7]="10:00"
this.queue[4][7]="11:00"
this.queue[5][7]="12:00"
this.queue[6][7]="13:00"
this.queue[7][7]="14:00"
this.queue[8][7]="15:00"
this.queue[9][7]="16:00"
this.queue[10][7]="17:00"
this.queue[11][7]="18:00"
this.queue[12][7]="19:00"
this.queue[13][7]="20:00"
this.queue[14][7]="21:00"
this.queue[15][7]="22:00"

}

async Calculate() {

  this.scheduleUidToCalculate  = await this.user.getScheduleUidToCalculate(this.user.getUID());
  const len =  this.scheduleUidToCalculate.length;
  this.traineesSchedule = new Array(len);
  

  for(let i=0; i< len; i++) {
    this.traineesSchedule[i] = await this.user.getTraineeSchedule(this.scheduleUidToCalculate[i]);
  }

  this.arrayToServer = '';
  for(let i = 0; i < len; i++) {
    for(let j = 0 ; j < 101; j++) {
      this.arrayToServer+=this.traineesSchedule[i][j];
      this.arrayToServer += '@';
    }
    if (i <= len - 2) {
      this.arrayToServer += '#';
    }
  }
  this.arrayToServer += '%';
  this.arrayToServer += this.user.getUID();



  var divMsg ='';
  this.webSocket.send(this.arrayToServer);

  this.webSocket.onmessage = function(message) {
    divMsg += "Server> : " + message.data;

}

this.webSocket.onopen = function() {
console.log("connection opened");
};

this.webSocket.onclose = function() {
console.log("connection closed");
};

this.webSocket.onerror = function wserror(message) {
  console.log("error: " + message);
    }



 this.afs.doc(`users/${this.user.getUID()}`).update({finalSchedule: this.scheduleToFB});
  this.afs.doc(`users/${this.user.getUID()}`).update({canInputSchedule: false});
  this.trainerTrainees=this.user.getTrainerTrainees();
  for(let i=0; i<this.trainerTrainees.length; i++) {
    let traineesUID =<any>this.trainerTrainees[i].traineeUID;
    this.afs.doc(`users/${traineesUID}`).update({insertedWeekSchedule: false});
  }

  this.showAlert('Done!', 'Schedule was send and will be avaliable in 30 min');


}
async showAlert(header: string, message: string) {
  const alert = await this.alert.create({
    header,
    message,
    buttons: ['Ok']
  });
  await alert.present();
}
}