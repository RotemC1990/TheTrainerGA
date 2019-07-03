import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss'],
})
export class MetricsPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  // route to the bmi page
  bmi(){
    this.router.navigate(['/bmi']);

  }
}
