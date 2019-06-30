import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-show-trainings',
  templateUrl: './show-trainings.page.html',
  styleUrls: ['./show-trainings.page.scss'],
})
export class ShowTrainingsPage implements OnInit {

  finleschedule = new Array(15).fill(undefined).map(() => new Array(7).fill(undefined));
  scheduleFromFB: string[];
  haveTraine: boolean[];
  


  constructor( private user: UserService) 
  {
    



   
  }

  async ngOnInit() {
    this.init();
    this.haveTraine = new Array(98);
    this.haveTraine.fill(false);
    this.scheduleFromFB = new Array(98);
    this.scheduleFromFB = await this.user.getFinalSchedule(this.user.getTrainerUID());
    let traineeName = await this.user.getDisplayName();
    for (let i = 0; i < 98; i++) {
      let row = Math.floor(i / 14);
      let col = Math.floor((i % 14) + 1);
      if (this.scheduleFromFB[i] == traineeName) {
         this.haveTraine[i] = true;
      } else
      {
        this.finleschedule[col][row] = '';
      }
    }
  }


init()
{
this.finleschedule[0][5]="Fri"
this.finleschedule[0][4]="Thu"
this.finleschedule[0][3]="Wed"
this.finleschedule[0][2]="Tue"
this.finleschedule[0][1]="Mon"
this.finleschedule[0][0]="Sun"
this.finleschedule[0][7]="D/H"
this.finleschedule[0][6]="Sat"

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


}

}
