import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ControlModel } from 'src/app/models/control.model';
import { ControlService } from 'src/app/services/control.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente, Contacto, Estado, Prioridad, Responsable } from 'src/app/interfaces/interfaces';
import { PrioridadService } from 'src/app/services/prioridad.service';
import { ResponsableService } from 'src/app/services/responsable.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { EstadoService } from 'src/app/services/estado.service';
import { on } from 'events';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html'
})
export class ControlComponent implements OnInit {
  control = new ControlModel();
  clientes: Cliente[] = [];
  prioridades: Prioridad[] = [];
  responsables: Responsable[] = [];
  contactos: Contacto[] = [];
  estados: Estado[] = [];
  id: string = this.route.snapshot.paramMap.get('id');

  constructor(
    private controlService: ControlService, 
    private clienteService: ClienteService, 
    private prioridadService: PrioridadService, 
    private responsableService: ResponsableService,
    private contactoService: ContactoService,
    private estadoService: EstadoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Estamos obteniendo el ID del end point http://localhost:4200/control/3
    //http://localhost:4200/control/nuevo <- Si no se esta creando recién hace la llamada al api
    if (this.id !== 'nuevo') {
        this.controlService.obtenerContol(this.id)
        .subscribe((resp: ControlModel) => {
          this.control = resp;
          this.control.id = this.id;
          this.onSelectContacto(this.control.clienteID);
          this.listarEstado(this.control.tipoID);
        })
    }else{
        this.listarEstado(this.control.tipoID);
    }

    this.clienteService.listarClientes()
      .subscribe(resp => {
        console.log(resp);
        this.clientes = resp;
      })

    this.prioridadService.listarPrioridades()
      .subscribe(resp => {
        this.prioridades = resp;
        console.log(resp);
      })

    this.responsableService.listarResponsables()
      .subscribe(resp => {
        this.responsables = resp;
      })
  }

  onSelectContacto(id: number): void {
    this.contactoService.listarContactos(id).
    subscribe(resp => {
      this.contactos = resp;
      console.log('onSelectContacto: ' + resp);
    })
  }

  listarEstado(tipo: number): void {
    this.estadoService.listarEstados(tipo).
    subscribe(resp => {
      this.estados = resp;
      console.log('onSelectCliente: ' + resp);
    })
  }

  cambiarTipo(tipo: number): void{
    if(tipo===1){
      this.control.tipoID = 2;
    }else{
      this.control.tipoID = 1;
    }
  }

  onSelectEstado(tipo: number): void {
    this.cambiarTipo(tipo);
    this.listarEstado(this.control.tipoID);
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    //Validación para ver si el usuario existe
    if (this.control.id) {
      peticion = this.controlService.actualizarControl(this.control);
    } else {
      peticion = this.controlService.crearControl(this.control);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: this.control.codigo + ' - ' + this.control.descripcion,
        text: 'Se actualizo correctamente',
      });
    })
  }

}
