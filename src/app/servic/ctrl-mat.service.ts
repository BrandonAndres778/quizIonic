import { Storage } from '@ionic/storage-angular';
import { Materia } from '../model/materia';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private Materias: Materia[] = [];
  private clave = 'Materias';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
    await this.loadMaterias();  // Cargar materias una vez creado el Storage
  }

  async loadMaterias() {
    let materias = await this.storage.get(this.clave);
    if (materias) {
      this.Materias = materias;
    } else {
      this.Materias = [];  // Si no hay materias, inicializa como arreglo vacío
    }
  }


  async getMaterias(): Promise<Materia[]> {
    await this.loadMaterias();
    return this.Materias;
  }

  getMateria(id: number) {
    return this.Materias.find(m => m.id === id);
  }

  async CrearMateria(materia: Materia) {
    this.Materias.push(materia);
    await this.GuardarStorage();  // Guardar después de crear
  }

  async ActualizarMateria(materia: Materia) {
    const index = this.Materias.findIndex(m => m.id === materia.id);
    if (index !== -1) {
      this.Materias[index] = materia;
      await this.GuardarStorage();
    }
  }

  async BorrarMateria(id: number) {
    this.Materias = this.Materias.filter(m => m.id !== id);
    this.GuardarStorage();
  }

  private async GuardarStorage() {
    await this.storage.set(this.clave, this.Materias);
    this.loadMaterias();
  }

  public async clear(){
    this.storage.clear();
    this.Materias = [];
    this.loadMaterias();
  }

  getNotas(id: number) {
    const materia = this.Materias.find(m => m.id === id);  // Encuentra la materia por id
    return materia ? materia.notas : [];  // Si la materia existe, devuelve las notas, si no, un arreglo vacío
  }


}