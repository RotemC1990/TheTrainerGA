import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowPublicMessagesPage } from './show-public-messages.page';

const routes: Routes = [
  {
    path: '',
    component: ShowPublicMessagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowPublicMessagesPage]
})
export class ShowPublicMessagesPageModule {}
