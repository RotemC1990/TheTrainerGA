import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  galleryPictures;
  path: string;
  constructor(private afs: AngularFirestore, private user: UserService, private router: Router) {
    if(this.user.getUserType() == 'trainee') {
      this.path = this.user.getTrainerUID();
    } else {
      this.path = this.user.getUID();
    }
    const pictures = afs.doc(`users/${this.path}`);
    this.galleryPictures = pictures.valueChanges();
  }

  ngOnInit() {
  }
  goto(picId: string){
    this.router.navigate(['pic-desc/' + picId]);
  }

}
