import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-private-messages-chat',
  templateUrl: './private-messages-chat.page.html',
  styleUrls: ['./private-messages-chat.page.scss'],
})
export class PrivateMessagesChatPage implements OnInit {

  traineeUID: string;
  messageToSend: string;
  messages;
  first: string;
  second: string;
  uid: string;

  constructor(private afstore: AngularFirestore, private user: UserService , private route: ActivatedRoute) {
    console.log(user.getUID());
    if(user.getUserType() == 'trainee'){
      this.first = user.getTrainerUID();
      this.second = user.getUID();
    } else {
      this.first = user.getUID();
      this.traineeUID = this.route.snapshot.paramMap.get('traineeUID');
      this.second = this.traineeUID;
    }
    this.uid = this.user.getUID();
    const messagesArray = afstore.doc(`privateMessages/${this.first}-${this.second}`);
    this.messages = messagesArray.valueChanges();
   }

  ngOnInit() {

  }
  SendMessage() {
      const senderUID = this.user.getUID();
      const message = this.messageToSend;
    
      this.afstore.doc(`privateMessages/${this.first}-${this.second}`).update({
        Messages : firestore.FieldValue.arrayUnion({senderUID , message}),
      });
      this.messageToSend ='';
  }

}
