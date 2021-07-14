import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ControlModel } from 'src/app/models/control.model';
import { ControlService } from 'src/app/services/control.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html'
})
export class ControlComponent implements OnInit {

  control = new ControlModel();
  cliente = new ControlModel();
  prioridad = new  ControlModel();
  responsable = new ControlModel();
  contacto = new ControlModel();
  estado = new ControlModel();
  constructor(private controlService: ControlService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Estamos obteniendo el ID del end point http://localhost:4200/control/3
    const id = this.route.snapshot.paramMap.get('id');
    //http://localhost:4200/control/nuevo <- Si no se esta creando recién hace la llamada al api
    if (id !== 'nuevo') {
      this.controlService.obtenerContol(id)
        .subscribe((resp: ControlModel) => {
          this.control = resp;
          this.control.id = id;
          console.log(resp);
        })
    }
    this.controlService.listarCliente()
      .subscribe((resp: ControlModel) => {
        this.cliente =resp;
        console.log(resp);
      })
    this.controlService.listarPrioridad()
      .subscribe((resp: ControlModel) => {
        this.prioridad = resp;
        console.log(resp);
      })
      this.controlService.listarResponsable()
      .subscribe((resp: ControlModel) => {idCliente
        this.responsable = resp;
        console.log(resp);
      })
      const idCliente = this.route.snapshot.paramMap.get("idCliente");
      this.controlService.listarContacto(this.control.clienteID.toString())
      .subscribe((resp: ControlModel) => {
        this.contacto = resp;
        console.log(resp);
      })
      //const tipo = this.route.snapshot.paramMap.get('tipo');
      this.controlService.listarEstado(this.control.tipoID.toString())
      .subscribe((resp: ControlModel) => {
        this.estado = resp;
        console.log(resp);
      })
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
