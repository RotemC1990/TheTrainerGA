import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-gallery-pic',
  templateUrl: './gallery-pic.page.html',
  styleUrls: ['./gallery-pic.page.scss'],
})
export class GalleryPicPage implements OnInit {

  galleryPictures;

  constructor(private afs: AngularFirestore, private user: UserService, private router: Router) { 
    const pictures = afs.doc(`users/${user.getUID()}`);
    this.galleryPictures= pictures.valueChanges();
  }

  ngOnInit() {
  }
  goto(picId: string){
    this.router.navigate(['../tabs/pic-desc/' + picId]);
  }

}



