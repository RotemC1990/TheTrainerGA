import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthService} from './auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'gallery', loadChildren: './gallery/gallery.module#GalleryPageModule', canActivate: [AuthService] },
  { path: 'register-admin', loadChildren: './register-admin/register-admin.module#RegisterAdminPageModule' },
  { path: 'register-trainer', loadChildren: './register-trainer/register-trainer.module#RegisterTrainerPageModule' },
  { path: 'post-public-messages', loadChildren: './post-public-messages/post-public-messages.module#PostPublicMessagesPageModule' },
  { path: 'show-public-messages', loadChildren: './show-public-messages/show-public-messages.module#ShowPublicMessagesPageModule' },
  { path: 'post-private-messages', loadChildren: './post-private-messages/post-private-messages.module#PostPrivateMessagesPageModule' },

  { path: 'gallery-pic', loadChildren: './gallery/gallery-pic/gallery-pic.module#GalleryPicPageModule' , canActivate: [AuthService]},
  { path: 'pic-desc', loadChildren: './pic-desc/pic-desc.module#PicDescPageModule' },
  { path: 'pic-desc/:id', loadChildren: './pic-desc/pic-desc.module#PicDescPageModule' },

  { path: 'trainee', loadChildren: './trainee/trainee.module#TraineePageModule' },
  { path: 'metrics', loadChildren: './metrics/metrics.module#MetricsPageModule' },
  { path: 'bmi', loadChildren: './metrics/bmi/bmi.module#BmiPageModule' },
  { path: 'schedule/:numOfTrainings', loadChildren: './schedule/schedule.module#SchedulePageModule' },
  { path: 'gallery-intro', loadChildren: './gallery-intro/gallery-intro.module#GalleryIntroPageModule' },
  { path: 'massage-intro', loadChildren: './massage-intro/massage-intro.module#MassageIntroPageModule' },
// tslint:disable-next-line: max-line-length
  { path: 'private-messages-chat/:traineeUID', loadChildren: './private-messages-chat/private-messages-chat.module#PrivateMessagesChatPageModule' },
  { path: 'private-messages-chat', loadChildren: './private-messages-chat/private-messages-chat.module#PrivateMessagesChatPageModule' },
  { path: 'trainer', loadChildren: './trainer/trainer.module#TrainerPageModule' },
  { path: 'messages-intro', loadChildren: './trainer/messages-intro/messages-intro.module#MessagesIntroPageModule' },
  { path: 'chat-intro', loadChildren: './trainer/messages-intro/chat-intro/chat-intro.module#ChatIntroPageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'delete-user', loadChildren: './delete-user/delete-user.module#DeleteUserPageModule' },
  { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  { path: 'num-of-workout', loadChildren: './num-of-workout/num-of-workout.module#NumOfWorkoutPageModule' },
  { path: 'block-schedule', loadChildren: './trainer/block-schedule/block-schedule.module#BlockSchedulePageModule' },
  { path: 'show-all-trainings', loadChildren: './trainer/show-all-trainings/show-all-trainings.module#ShowAllTrainingsPageModule' },
  { path: 'show-trainings', loadChildren: './trainee/show-trainings/show-trainings.module#ShowTrainingsPageModule' },
  { path: 'schedule-intro', loadChildren: './trainer/schedule-intro/schedule-intro.module#ScheduleIntroPageModule' },
  { path: 'calculate-schedule', loadChildren: './trainer/calculate-schedule/calculate-schedule.module#CalculateSchedulePageModule' },
  { path: 'show-schedule', loadChildren: './trainer/show-schedule/show-schedule.module#ShowSchedulePageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
