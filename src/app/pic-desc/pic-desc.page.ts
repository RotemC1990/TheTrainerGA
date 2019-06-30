import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import {firestore} from 'firebase/app';

@Component({
  selector: 'app-pic-desc',
  templateUrl: './pic-desc.page.html',
  styleUrls: ['./pic-desc.page.scss'],
})
export class PicDescPage implements OnInit {

  pictureId: string;
  post;
  postReference: AngularFirestoreDocument;
  sub;
  heartType: string = 'heart-empty';
  path: string;
  numOfLikes;
  shownumOflikes: boolean;

  constructor(private route: ActivatedRoute,
     private afs: AngularFirestore,
     private user:UserService) {}

  async ngOnInit() {
    this.shownumOflikes = false;
    this.pictureId = this.route.snapshot.paramMap.get('id');
    if(this.user.getUserType() == 'trainer') {
      this.path = this.user.getUID();
    } else {
      this.path = this.user.getTrainerUID();
    }
    this.postReference = this.afs.doc(`posts/trainers/${this.path}/${this.pictureId}`)
    this.sub = this.postReference.valueChanges().subscribe(val=>{
     
      this.post = val;
      this.heartType = val.likes.includes(this.user.getUID()) ? 'heart' : 'heart-empty';
      this.numOfLikes = val.likes.length;
      if(this.numOfLikes > 0) {
        this.shownumOflikes = true;
      }
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  toggleHeart(){
    if(this.heartType == 'heart-empty'){
      this.postReference.update({
        likes: firestore.FieldValue.arrayUnion(this.user.getUID())
      })
    } else {
      this.postReference.update({
        likes: firestore.FieldValue.arrayRemove(this.user.getUID())
      })
    }
  }
}
