import { NumberFormatStyle } from "@angular/common";
import { logging } from "protractor";
import * as internal from "stream";

export class ControlModel{
    id: string;
    clienteID: string;
    nombreCliente: string;
    contactoID: string;
    nombreContacto: string;
    tipoID: number;
    descripcionTipo: string;
    estadoID: string; 
    descripcionEstado: string;
    prioridadID: string;
    descripcionPrioridad: string;
    responsableID: string;
    nombreResponsable: string;
    horasDEV: string;
    horasQAS: string;
    codigo: string;
    descripcion: string;
    fecha: string;
    //nombre : string;
    constructor(){
        this.tipoID=1;
    }


}