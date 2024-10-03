import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { IonContent, IonHeader,
   IonTitle, IonToolbar,
    IonItem, IonLabel, 
    IonButton, IonInput,
     IonList, IonCard, 
     IonCardHeader, IonCardTitle,
      IonCardContent, IonButtons,
       IonMenu, IonMenuButton,
        IonCardSubtitle, IonSearchbar, IonRefresherContent, IonRefresher } from '@ionic/angular/standalone';
import { MateriasService } from '../servic/ctrl-mat.service';
import { NotasService } from '../servic/nota.service';
import { Materia } from '../model/materia';
import { Nota } from '../model/nota';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Importar Rutas
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listanotas',
  templateUrl: './listanotas.page.html',
  styleUrls: ['./listanotas.page.scss'],
  standalone: true,
  imports: [IonRefresher, IonRefresherContent, IonCardSubtitle, IonButtons,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonList,
    IonInput,
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonItem,
    IonLabel,
    IonButton,
    IonSearchbar,
    RouterModule,
    FormsModule]
})
export class ListanotasPage implements OnInit {
  materias: Materia[] = [];
  notas: Nota[] = [];
  materiaID: any;
  titulo = 'Crear Materia'
  notasFiltradasCorte: { [corte: number]: Nota[] } = {};
  searchTerm: string = '';
  
  Irnota: boolean = false;
  
  
    materia: Materia = {
      id: 1,
      nombre: '',
      semestre: '',
      codigo: '',
      horario: '',
      notas: [],
      observaciones: ''
    };
  
    constructor(private MateriasService: MateriasService, private NotasService: NotasService, private router: Router, private activatedRoute: ActivatedRoute,   private alertController: AlertController) { }
    async ngOnInit() {
      this.materiaID = this.activatedRoute.snapshot.paramMap.get('materiaID'); // Obtener materiaID al inicio
      await this.CargarNotas();
      await this.CargarMateria(this.materiaID);
      console.log(this.notas.filter(nota => nota.corte === 1))
      this.titulo = this.materia.nombre
      this.filtrarNotasMateria()
     
    }
  
    async CargarMateria(id: number){
      const materia = await this.MateriasService.getMateria(id);
      if(materia){
        this.materia = materia;
      } else {
        console.error('Materia no encontrada')
      }
    }

    ActualizarPage() {
      location.reload()
  }
    buscarNotas(event: any) {
      const searchValue = event.target.value.toLowerCase();
  
      for (let corte of [1, 2, 3, 4]) {
        this.notasFiltradasCorte[corte] = this.notas.filter(nota =>
          nota.descripcion.toLowerCase().includes(searchValue) && nota.corte === corte
        );
      }
    }
    
    async CargarNotas() {
      this.notas = await this.NotasService.getNotas();
      const notasMateria = this.notas.filter(nota => nota.idMateria === this.materiaID)
      if(notasMateria){
        this.materia.notas = notasMateria.map(nota => nota.nota)
        
      }
      this.materiaID = this.activatedRoute.snapshot.paramMap.get('materiaID')
  
    }
  
  
  
    filtrarNotasMateria() {
      const cortes = [1,2,3,4]; // Define los cortes
  
      // Filtrar las notas por idMateria y corte al mismo tiempo
      cortes.forEach(corte => {
        this.notasFiltradasCorte[corte] = this.notas.filter(nota =>
          nota.idMateria === this.materia.id && nota.corte === corte
        );
        console.log(this.notas.filter(nota => nota.corte === corte))  
      });
    }
  
  
    //   
    async confirmarEliminarNota(id: number) {
      const alert = await this.alertController.create({
        header: 'Confirmar eliminación',
        message: '¿Estás seguro de que quieres eliminar esta nota?',
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
              await this.borrarNota(id);
              console.log('Nota eliminada');
              this.mostrarAlerta('Nota eliminada con éxito');
              location.reload();
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
      await this.MateriasService.loadMaterias()
      await alert.present();
    }
  
  
    // borrar nota de forma individual
    async borrarNota(id: number){
      await this.NotasService.BorrarNota(id)
    }
  
  }
  
  