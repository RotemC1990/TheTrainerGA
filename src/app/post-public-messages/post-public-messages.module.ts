import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostPublicMessagesPage } from './post-public-messages.page';

const routes: Routes = [
  {
    path: '',
    component: PostPublicMessagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostPublicMessagesPage]
})
export class PostPublicMessagesPageModule {}
