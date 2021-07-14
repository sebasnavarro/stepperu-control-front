import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlModel } from '../models/control.model';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { keyframes } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  private url = 'https://stepperu-control.herokuapp.com/api';

  constructor(private http: HttpClient) { }



  crearControl(control: ControlModel) {
    return this.http.post(`${this.url}/control`, control).pipe(
      map((resp: any) => {
        control.id = resp.control.id;
        return control;
      })
    );

  }

  actualizarControl(control: ControlModel) {
    return this.http.put(`${this.url}/control/${control.id}`, control)
  }

  borrarContol(id: string) {
    return this.http.delete(`${this.url}/control/${id}`);
  }

  obtenerContol(id: string) {
    return this.http.get(`${this.url}/control/${id}`);
  }


  listarControles(page: number): Observable<any> {
    return this.http.get(`${this.url}/control/page/` + page).pipe(
      tap((response: any) => {
        (response.content as ControlModel[]);
      }));
  }
  listarCliente() {
    return this.http.get(`${this.url}/cliente`);
  }
  listarPrioridad() {
    return this.http.get(`${this.url}/prioridad`);
  }
  listarContacto(cliente: string): Observable<any> {
    return this.http.get(`${this.url}/contacto/cliente/` + cliente).pipe(
      tap((response: any) => {
        (response.content as ControlModel[]);
      }));
  }
  listarResponsable() {
    return this.http.get(`${this.url}/responsable`);
  }
  listarEstado(tipo: string): Observable<any> {
    return this.http.get(`${this.url}/estado/tipo/` + tipo).pipe(
      tap((response: any) => {
        (response.content as ControlModel[]);
      }));
  }
}
