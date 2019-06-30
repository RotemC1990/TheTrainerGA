import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NumOfWorkoutPage } from './num-of-workout.page';

const routes: Routes = [
  {
    path: '',
    component: NumOfWorkoutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NumOfWorkoutPage]
})
export class NumOfWorkoutPageModule {}
