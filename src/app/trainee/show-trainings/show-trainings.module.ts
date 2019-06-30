import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowTrainingsPage } from './show-trainings.page';

const routes: Routes = [
  {
    path: '',
    component: ShowTrainingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowTrainingsPage]
})
export class ShowTrainingsPageModule {}
