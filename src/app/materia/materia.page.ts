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
       IonCardSubtitle, IonSearchbar } from '@ionic/angular/standalone';
import { MateriasService } from '../servic/ctrl-mat.service';
import { Materia } from '../model/materia';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Importar Rutas

@Component({
  selector: 'app-materia',
  templateUrl: './materia.page.html',
  styleUrls: ['./materia.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonButtons,
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
export class MateriaPage implements OnInit {
Materias: Materia[] = [];
materiaID: any;
editar: boolean = false;
titulo = 'Crear Materia'



  materia: Materia = {
    id: 1,
    nombre: '',
    semestre: '',
    codigo: '',
    horario: '',
    notas: [],
    observaciones: ''
  };

  constructor(private MateriasService: MateriasService, private router: Router, private activatedRoute: ActivatedRoute) { }
  async ngOnInit() {
    this.materiaID = this.activatedRoute.snapshot.paramMap.get('materiaID'); // Obtener materiaID al inicio
    if(this.materiaID){
      await this.CargarMateria(this.materiaID)
      this.titulo = "modificar ", this.materia.nombre
      this.editar = true;
    }


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


  GuardarMateria(){
    if(this.materiaID){
      this.actualizarMateria()
    } else{
      this.crearMateria()
    }
  }
 

  async crearMateria() {
    await this.MateriasService.CrearMateria(this.materia);
    this.router.navigate(['/lista-materias']); 
  }

 

  async actualizarMateria() {
    await this.MateriasService.ActualizarMateria(this.materia);
    this.router.navigate(['/lista-materias']);
}


}
