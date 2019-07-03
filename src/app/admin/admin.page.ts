import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  //function that route to a register pages by type
  RegisterAdmin() {
    this.router.navigate(['register-admin']);
  }

  RegisterTrainers() {
    this.router.navigate(['register-trainer']);
  }
  DeleteUser() {
    this.router.navigate(['delete-user']);
  }
}
