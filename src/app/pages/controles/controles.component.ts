import { Component, OnInit } from '@angular/core';
import { ControlModel } from 'src/app/models/control.model';
import { ControlService } from 'src/app/services/control.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-controles',
  templateUrl: './controles.component.html',
  styleUrls: ['./controles.component.css']
})
export class ControlesComponent implements OnInit {
  control: ControlModel[];
  paginador: any;
  cargando = false;

  constructor(private controlService: ControlService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
      this.cargando = true;
      this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.controlService.listarControles(page)
        .pipe(
          tap(response => {
            (response.content as ControlModel[]);
          })
        ).subscribe(response => {
          this.control = response.content as ControlModel[];
          this.paginador = response;
          this.cargando = false;
        });
    });
  }

  borrarControl(control: ControlModel){
    Swal.fire({
      icon: 'question',
      title: '¿Está seguro?',
      text: 'Desea eliminar el '+control.descripcionTipo+': '+control.codigo+' - '+control.descripcion,
      showConfirmButton: true,
      showCancelButton: true
    }).then( result => {
      if(result.value){
        this.controlService.borrarContol(control.id).subscribe(
          () =>{
            this.control = this.control.filter(con => con !== control)
            Swal.fire(
              'Control Eliminado!',
               control.descripcionTipo+': '+control.codigo+' - '+control.descripcion + `eliminado con éxito.`,
              'success'
            )
          }
        );
      }
    });
  }


}
