import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-intro',
  templateUrl: './schedule-intro.page.html',
  styleUrls: ['./schedule-intro.page.scss'],
})
export class ScheduleIntroPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  initializeSchedule() {
    this.router.navigate(['block-schedule']);
  }

  calculate() {
    this.router.navigate(['calculate-schedule']);
  }

  show() {
    this.router.navigate(['show-all-trainings']);
  }

}
