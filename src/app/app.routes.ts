import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('src/app/inic/inic.page').then( m => m.InicioPage)
  },
  {
    path: 'materia',
    loadComponent: () => import('./materia/materia.page').then( m => m.MateriaPage)
  },
  {
    path: 'materia/:materiaID',
    loadComponent: () => import('./materia/materia.page').then( m => m.MateriaPage)
  },
  {
    path: 'nota/:MateriaId',
    loadComponent: () => import('./nota/nota.page').then( m => m.NotaPage)
  },
  {
    path: 'nota/:MateriaId/nota/:NotaId',
    loadComponent: () => import('./nota/nota.page').then( m => m.NotaPage)
  },
  {
    path: 'lista-materias',
    loadComponent: () => import('./lista-materias/lista-materias.page').then( m => m.ListaMateriasPage)
  },
  {
    path: 'listanotas/:materiaID',
    loadComponent: () => import('./listanotas/listanotas.page').then( m => m.ListanotasPage)
  },

 


];

