import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-show-public-messages',
  templateUrl: './show-public-messages.page.html',
  styleUrls: ['./show-public-messages.page.scss'],
})
export class ShowPublicMessagesPage implements OnInit {

  messages;

  constructor(private afs: AngularFirestore, private user: UserService) {
    console.log(user.getTrainerUID());
    const messagesArray = afs.doc(`publicMessages/${user.getTrainerUID()}`);
    this.messages = messagesArray.valueChanges();
   }

  ngOnInit() {
  }

}
