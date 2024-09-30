import { Nota } from "../model/nota";

export interface Materia {
    id: number;
    nombre: string;
    semestre: string;
    codigo: string;
    horario: string;
    observaciones: string;
    notas: number[];
}

export{Nota} 