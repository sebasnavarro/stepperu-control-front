import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Estado } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private estados: Estado[] = [];

  constructor( private http: HttpClient) { }

  listarEstados(tipoID: number){
  /*  if ( this.estados.length > 0){
      //no tenemos estados
      console.log('Desde caché');
      return of(this.estados);
    } else{
      console.log('Desde internet');*/
      return this.http.get<Estado[]>(`${ environment.url }/estado/tipo/${tipoID}`);
  /*    .pipe(
        tap(
          estados => this.estados = estados
          ) 
        );
      }*/
  }
}
