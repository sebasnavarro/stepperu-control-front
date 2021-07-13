import { NumberFormatStyle } from "@angular/common";
import { logging } from "protractor";
import * as internal from "stream";

export class ControlModel{
    id: number;
    clienteID: number;
    contactoID: number;
    tipoID: number;
    estadoID: number; 
    prioridadID: number;
    responsableID: number;
    horasDEV: number;
    horasQAS: number;
    codigo: string;
    descripcion: string;
    fecha: string;

    constructor(){
        this.tipoID=1;
    }


}