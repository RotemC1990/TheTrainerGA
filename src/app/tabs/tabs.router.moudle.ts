import { RouterModule, Routes } from '@angular/router';
import {NgModule} from '@angular/core';
 import { TabsPage } from './tabs.page';
 const routes: Routes = [
     {
         path: '',
         component: TabsPage,
         children: [
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule' },
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
            { path: 'gallery', loadChildren: '../gallery/gallery.module#GalleryPageModule' },
            { path: 'pic-desc/:id', loadChildren: '../pic-desc/pic-desc.module#PicDescPageModule' },
            { path: 'pic-desc', loadChildren: '../pic-desc/pic-desc.module#PicDescPageModule' },]
     }
  ];
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class TabsRoutingModule { }
