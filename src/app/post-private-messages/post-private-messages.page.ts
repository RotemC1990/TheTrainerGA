import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-post-private-messages',
  templateUrl: './post-private-messages.page.html',
  styleUrls: ['./post-private-messages.page.scss'],
})
export class PostPrivateMessagesPage implements OnInit {
  message: string;
  traineesArray: string[];
  traineesCheckedByUID: string[];
  needToAddUser: boolean ;
  constructor(private afstore: AngularFirestore , private user: UserService ) { }

  async ngOnInit() {
    await this.user.getLoggedInUser().then(() => {
      this.traineesArray = this.user.getTrainerTrainees();
      console.log('in private message trainees ' );
      console.log(this.traineesArray);
      if(this.traineesArray.length>0){
        this.traineesCheckedByUID =  new Array<string>(this.traineesArray.length)
        for(let i = 0; i < this.traineesArray.length; i++) {
          this.traineesCheckedByUID[i] = '';
        }
      }
    });
  }


  selectTrainees(trainee)
  {
    this.needToAddUser = true; 
    for(let i = 0; i < this.traineesArray.length; i++) {
      if(this.traineesCheckedByUID[i] == trainee.traineeUID) {
        this.traineesCheckedByUID[i] = '';
        this.needToAddUser = false;
      }
    }
    if(this.needToAddUser) {
      for(let i = 0; i < this.traineesArray.length; i++) {
        if(this.traineesCheckedByUID[i] == ''){
          this.traineesCheckedByUID[i] = trainee.traineeUID;
          break;
        }
      }
    }
  }
  SendMessage(){
    console.log(this.traineesCheckedByUID)
    console.log('in private message uid ' + this.user.getUID());
    const message = this.message;
    const senderUID = this.user.getUID();
    for(let i = 0; i < this.traineesArray.length; i++) {
      if(this.traineesCheckedByUID[i] !== ''){
        this.afstore.doc(`privateMessages/${this.user.getUID()}-${this.traineesCheckedByUID[i]}`).update({
          Messages : firestore.FieldValue.arrayUnion({senderUID , message}),
        });
      }
    }

  }
}
