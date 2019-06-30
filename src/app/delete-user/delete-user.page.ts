import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.page.html',
  styleUrls: ['./delete-user.page.scss'],
})
export class DeleteUserPage implements OnInit {

  usersArray: string[];
  constructor(private afstore: AngularFirestore , private user: UserService, private router: Router , public alert: AlertController ) { }

  async ngOnInit() {
    await this.user.getLoggedInUser().then(() => {
        this.usersArray = this.user.getTrainerTrainees();
    });
  }
  beforeDelete(userUid, UserName) {
    this.showAlert('Delete User', 'Are You Sure You Want to Delete ' + UserName,userUid);
  }

  async showAlert(header: string, message: string,userUid :string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.Delete(userUid);
          }
        }
      ]
    });
    await alert.present();
  }

  Delete(userUid) {
    console.log(userUid + "  is deleted")

  }

}
