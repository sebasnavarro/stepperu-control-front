import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlModel } from '../models/control.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  private url = 'https://stepperu-control.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  getCliente(){
    const headers = new HttpHeaders({

    });

    this.http.get(`${ this.url }/cliente`,{headers}).subscribe(data => {
      console.log(data);
    })
  }

  crearControl(control: ControlModel){
    return this.http.post(`${ this.url }/control`,control).pipe(
      map((resp:any) => {
        control.id = resp.control.id;
        return control;
      })
    );

  }

}
