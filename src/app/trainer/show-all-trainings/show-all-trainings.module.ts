import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowAllTrainingsPage } from './show-all-trainings.page';

const routes: Routes = [
  {
    path: '',
    component: ShowAllTrainingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowAllTrainingsPage]
})
export class ShowAllTrainingsPageModule {}
