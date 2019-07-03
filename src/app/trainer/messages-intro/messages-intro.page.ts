import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages-intro',
  templateUrl: './messages-intro.page.html',
  styleUrls: ['./messages-intro.page.scss'],
})
export class MessagesIntroPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  //functions that routes to another pages
  Generalmessages() {
    this.router.navigate(['post-public-messages']);
  }

  MultiPrivateMassage() {
    this.router.navigate(['post-private-messages']);
  }

  ChatSelection() {
    this.router.navigate(['../chat-intro']);
  }
}
