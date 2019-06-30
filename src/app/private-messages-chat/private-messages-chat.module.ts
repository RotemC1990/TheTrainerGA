import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrivateMessagesChatPage } from './private-messages-chat.page';

const routes: Routes = [
  {
    path: '',
    component: PrivateMessagesChatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrivateMessagesChatPage]
})
export class PrivateMessagesChatPageModule {}
