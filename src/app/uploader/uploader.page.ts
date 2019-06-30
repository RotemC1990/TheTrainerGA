import { Component, OnInit, ViewChild } from '@angular/core';
import {Http} from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL: string;
  desc: string;
  busy: boolean = false;

  @ViewChild('fileButton') fileButton

  constructor(
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService,
    public alert: AlertController
    ) { }

  ngOnInit() {
  }


  fileChanged(event) {
    this.busy = true;
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', 'c80583d0f31a7fad9871');

    this.http.post('https://upload.uploadcare.com/base/', data).subscribe(
      event => {
        console.log(event);
        this.imageURL = event.json().file;
        this.busy = false;
      }
    )
  }
  async createPost(){
    this.busy = true;
    const image = this.imageURL;
    const desc = this.desc;
    this.afstore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion(image)
    })

    this.afstore.doc(`posts/trainers/${this.user.getUID()}/${image}`).set({
      desc,
      author: this.user.getUserName(),
      likes:[]
    });

    this.busy = false;
    this.imageURL = '';
    this.desc = '';

    this.showAlert('Done!', 'The Image And The Description Uploaded Successfully');
  }
  async showAlert(header: string, message: string)
  {
    const alert = await this.alert.create({
      header,
      message,
      buttons:['Ok']
    })
    await alert.present();
  }
  uploadFile(){
    this.fileButton.nativeElement.click();
  }
}
