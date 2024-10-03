import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,
   IonHeader,
    IonTitle, 
    IonToolbar, 
    IonList, IonItem, 
    IonLabel, IonButton, 
    IonMenu, IonButtons, 
    IonMenuButton, IonIcon,
     IonSearchbar, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inic.page.html',
  styleUrls: ['./inic.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButton, IonMenu, IonMenuButton, RouterModule, IonSearchbar]
})
export class InicioPage implements OnInit {
  

  constructor() { }

  async ngOnInit() {


  }



  ActualizarPage() {
      location.reload()
  }



}
