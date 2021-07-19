import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlModel } from '../models/control.model';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { keyframes } from '@angular/animations';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(private http: HttpClient) { }



  crearControl(control: ControlModel) {
    return this.http.post(`${environment.url}/control`, control).pipe(
      map((resp: any) => {
        control.id = resp.control.id;
        console.log(control);
        return control;
      })
    );

  }

  actualizarControl(control: ControlModel) {
    return this.http.put(`${environment.url}/control/${control.id}`, control)
  }

  borrarContol(id: string) {
    return this.http.delete(`${environment.url}/control/${id}`);
  }

  obtenerContol(id: string) {
    return this.http.get(`${environment.url}/control/${id}`);
  }


  listarControles(page: number): Observable<any> {
    return this.http.get(`${environment.url}/control/page/` + page).pipe(
      tap((response: any) => {
        (response.content as ControlModel[]);
      }));
  }

  listarContacto(clienteID: number): Observable<any> {
    return this.http.get(`${environment.url}/contacto/cliente/${clienteID}`).pipe(
      tap((response: any) => {
        (response.content as ControlModel[]);
        console.log(response);
      }));
  }

  listarEstado(tipo: number): Observable<any> {
    return this.http.get(`${environment.url}/estado/tipo/` + tipo).pipe(
      tap((response: any) => {
        (response.content as ControlModel[]);
      }));
  }
}
