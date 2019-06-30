import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.page.html',
  styleUrls: ['./trainee.page.scss'],
})
export class TraineePage implements OnInit {

  insertTrainings: boolean =false;
  constructor(public router: Router, private user: UserService) { 

  }

   ngOnInit() {
     this.insertTrainings = this.user.getCanInputSchedule();
  }
  gallery(){
    this.router.navigate(['../gallery']);

  }
  messages(){
    this.router.navigate(['../massage-intro']);

  }
  metrics(){
    this.router.navigate(['/metrics']);

  }
  Notifications(){
    this.router.navigate(['notification']);

  }
 
  numofworkout() {
    this.router.navigate(['num-of-workout']);

  }
  watchSchedule() {
    this.router.navigate(['show-trainings']);
  }
}
