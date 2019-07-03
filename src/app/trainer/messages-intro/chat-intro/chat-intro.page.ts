import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat-intro',
  templateUrl: './chat-intro.page.html',
  styleUrls: ['./chat-intro.page.scss'],
})
export class ChatIntroPage implements OnInit {

  traineesArray: string[];
  constructor(private afstore: AngularFirestore , private user: UserService, private router: Router ) { }

  async ngOnInit() {
    await this.user.getLoggedInUser().then(() => {
      this.traineesArray = this.user.getTrainerTrainees();
    });
  }
  //ruote to a chat page with the selecter trainee
  goto(trainee: string){
    this.router.navigate(['private-messages-chat/' + trainee]);
  }

}
