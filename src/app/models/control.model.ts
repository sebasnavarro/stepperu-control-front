import { NumberFormatStyle } from "@angular/common";
import { logging } from "protractor";
import * as internal from "stream";

export class ControlModel{
    id: string;
    clienteID: number;
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
    horasDEV: number;
    horasQAS: number;
    codigo: string;
    descripcion: string;
    fecha: string;
    //nombre : string;
    constructor(){
        this.tipoID=1;
        this.clienteID = null;
        this.contactoID = null;
        this.prioridadID = null;
        this.estadoID = null;
        this.responsableID = null;
    }


}