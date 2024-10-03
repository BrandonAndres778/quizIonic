import { Storage } from '@ionic/storage-angular';
import { Nota } from '../model/nota';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private Notas: Nota[] = [];
  private clave = 'Notas';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
    await this.loadNotas();  // Cargar Notas una vez creado el Storage
  }

  async loadNotas() {
    let Notas = await this.storage.get(this.clave);
    if (Notas) {
      this.Notas = Notas;
    } else {
      this.Notas = [];  // Si no hay Notas, inicializa como arreglo vacío
    }
  }

  async getNotas(): Promise<Nota[]> {
    await this.loadNotas();
    return this.Notas;
  }

  getNota(id: number) {
    return this.Notas.find(m => m.id === id);
  }

  async CrearNota(Nota: Nota) {
    this.Notas.push(Nota);
    await this.GuardarStorage();  // Guardar después de crear
  }

  async ActualizarNota(Nota: Nota) {
    const index = this.Notas.findIndex(m => m.id === Nota.id);
    if (index !== -1) {
      this.Notas[index] = Nota;
      await this.GuardarStorage();
    }
  }

  async BorrarNota(id: number) {
    this.Notas = this.Notas.filter(m => m.id !== id);
    this.GuardarStorage();
  }

  private async GuardarStorage() {
    await this.storage.set(this.clave, this.Notas);
    this.loadNotas();
  }

  public async clear(){
    this.storage.clear();
    this.Notas = [];
    this.loadNotas();
  }

}

