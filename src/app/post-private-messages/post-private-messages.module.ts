import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostPrivateMessagesPage } from './post-private-messages.page';

const routes: Routes = [
  {
    path: '',
    component: PostPrivateMessagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostPrivateMessagesPage]
})
export class PostPrivateMessagesPageModule {}
