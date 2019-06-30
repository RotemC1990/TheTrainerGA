import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { WeekDay, formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Local } from 'protractor/built/driverProviders';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  event ={
    title: '',
    desc:'',
    startTime: '',
    endTime: '',
  }


  eventSource=[];
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  }
  minDate = this.calendar.currentDate.toISOString();

  
  viewTitle='';
  constructor(private alertCtrl: AlertController,@Inject(LOCALE_ID) private locale: string) {

   }
  ngOnInit() {
    this.resetEvent();
  }
  @ViewChild(CalendarComponent) myCal:CalendarComponent
  resetEvent(){
    this.event={
      title: '',
      desc:'',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      
    }
    console.log('startTime 1 : ' +this.event.startTime) ;

  }
  addEvent(){
    
    let eventCopy={
    title: 'אימון',
    startTime:new Date(this.event.startTime),
    endTime:new Date(this.event.endTime),
    desc:this.event.desc,
    
    }
    console.log('startTime 2 : ' +eventCopy.startTime) ;



    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
   
  }
  async onEventSelected(event){
    let start =formatDate(event.startTime,'medium',this.locale)
    let end =formatDate(event.endTime,'medium',this.locale)

    const alert= await this.alertCtrl.create({
      header: event.title,
      subHeader:event.desc,
      message:'from:'+start+'<br><br>To:'+end,
      buttons:['OK']
    });
    alert.present()

  }
  onViewTitleChanged(title){
    this.viewTitle=title

  }
  onTimeSelected(ev){
    

    let Selected = new Date(ev.selectedTime);
    /*console.log('Selected time: ' + ev.selectedTime  );
    console.log('שעה : ' + (Selected.getHours() ) );
     console.log('יום : ' + (Selected.getDay()+1) );
     console.log('שנה : ' + (Selected.getUTCFullYear()) );
     console.log('חודש : ' + (Selected.getUTCMonth()+1) );*/
   this.event.startTime=Selected.toISOString();
   Selected.setHours(Selected.getHours()+1)
   this.event.endTime=(Selected.toISOString());
   
       
  }
  
  
}
