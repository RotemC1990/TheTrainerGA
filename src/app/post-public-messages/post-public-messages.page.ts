import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-post-public-messages',
  templateUrl: './post-public-messages.page.html',
  styleUrls: ['./post-public-messages.page.scss'],
})
export class PostPublicMessagesPage implements OnInit {

  title: string;
  message: string;
  constructor(private afstore: AngularFirestore , private user : UserService ) { }

  ngOnInit() {
  }

  //function that publish the public massages
  async PublishMessage(){
    const title = this.title;
    const message = this.message;
    this.afstore.doc(`publicMessages/${this.user.getUID()}`).update({
      Messages : firestore.FieldValue.arrayUnion({title , message}),
    });

  }
}
