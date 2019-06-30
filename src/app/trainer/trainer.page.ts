import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.scss'],
})
export class TrainerPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  messages() {
    this.router.navigate(['../messages-intro']);
  }

  gallery() {
    this.router.navigate(['../tabs']);
  }

  Notifications() {
    this.router.navigate(['notification']);
  }

  Schedule() {
    this.router.navigate(['schedule-intro' ]);
  }
  Register() {
    this.router.navigate(['register']);
  }
  TraineesDelete() {
    this.router.navigate(['delete-user']);

  }
  metrics(){
    this.router.navigate(['/metrics']);

  }
}
