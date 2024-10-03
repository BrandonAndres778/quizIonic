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
import { MateriasService } from '../servic/ctrl-mat.service';
import { NotasService } from '../servic/nota.service';
import { Materia } from '../model/materia';
import { Nota } from '../model/nota';
import { RouterModule } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.page.html',
  styleUrls: ['./lista-materias.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButton, IonMenu, IonMenuButton, RouterModule, IonSearchbar]
})
export class ListaMateriasPage implements OnInit {
  controlMateria: Materia[] = [];
  controlNota: Nota[] = [];
  searchTerm: string = '';
  Promedio = [];
  

  constructor(private MateriasService: MateriasService, private NotasService: NotasService, private alertController: AlertController) { }

  async ngOnInit() {
    await this.CargarMaterias();
    console.log('Materias cargadas:', this.controlMateria);

  }

  async CargarMaterias() {
    this.controlMateria = await this.MateriasService.getMaterias();
  }

  async buscarMaterias(event: any) {
    const searchValue = event.target.value.toLowerCase();

    this.controlMateria = (await (this.MateriasService.getMaterias())).filter(materia =>
      materia.nombre.toLowerCase().includes(searchValue)
    );

  }

  ActualizarPage() {
      location.reload()
  }

  async confirmarEliminarMateria(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta materia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.MateriasService.BorrarMateria(id); 
            console.log('Materia eliminada');
            this.mostrarAlerta('Materia eliminada con éxito');
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }

}
