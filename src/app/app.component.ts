import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  // initialise firebase onInit
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBtJPW4KxmFl60H_abmhfL76ElwGTyMAH0",
      authDomain: "recipebook-302be.firebaseapp.com",
    });
  }

  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
