import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery-intro',
  templateUrl: './gallery-intro.page.html',
  styleUrls: ['./gallery-intro.page.scss'],
})
export class GalleryIntroPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  gallery(){
    this.router.navigate(['../gallery']);
  }

}
