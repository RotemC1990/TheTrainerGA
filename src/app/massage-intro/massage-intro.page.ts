import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-massage-intro',
  templateUrl: './massage-intro.page.html',
  styleUrls: ['./massage-intro.page.scss'],
})
export class MassageIntroPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  publicMassage(){
    this.router.navigate(['../show-public-messages']);
  }
  privateMassage() {
   
    this.router.navigate(['../private-messages-chat']);
  }
}
