import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ControlModel } from 'src/app/models/control.model';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {



  control = new ControlModel();
  constructor( private controlService: ControlService) { }

  ngOnInit(): void {
  }

  guardar(form: NgForm){
    if (form.invalid){
      console.log('Formulario no válido');
      return;
    }
    this.controlService.crearControl(this.control).subscribe(resp => {
      console.log(resp);
    })
  
  
  }

  
}
