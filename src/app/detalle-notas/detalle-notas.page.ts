import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalle-notas',
  templateUrl: './detalle-notas.page.html',
  styleUrls: ['./detalle-notas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetalleNotasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
