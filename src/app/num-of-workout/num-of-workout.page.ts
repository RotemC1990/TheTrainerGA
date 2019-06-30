import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-num-of-workout',
  templateUrl: './num-of-workout.page.html',
  styleUrls: ['./num-of-workout.page.scss'],
})
export class NumOfWorkoutPage implements OnInit {
  input:number;
  public myFlag: boolean = false;

  constructor(public router: Router) {  
}
     
  ngOnInit() {
  }


  schdule()
  {

    if(this.input>0&&this.input<8)
    {
    

    this.router.navigate(['/schedule/' + this.input.toString()]);
    }
    else
    {
      alert("אנא הכנס מספר בין 0 ל 7")

    }
  }
}
