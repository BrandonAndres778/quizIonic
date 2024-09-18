import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products.page').then( m => m.ProductsPage)
  },
  {
    path: 'materia',
    loadComponent: () => import('./materia/materia.page').then( m => m.MateriaPage)
  },
  {
    path: 'nota',
    loadComponent: () => import('./nota/nota.page').then( m => m.NotaPage)
  },
  {
    path: 'detalle-notas',
    loadComponent: () => import('./detalle-notas/detalle-notas.page').then( m => m.DetalleNotasPage)
  },
  {
    path: 'notas',
    loadComponent: () => import('./notas/notas.page').then( m => m.NotasPage)
  },
];
