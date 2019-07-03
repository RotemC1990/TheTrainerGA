import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PicDescPage } from './pic-desc.page';
import { ShareModule } from '../share.module';

const routes: Routes = [
  {
    path: '',
    component: PicDescPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  declarations: [PicDescPage]
})
export class PicDescPageModule {}