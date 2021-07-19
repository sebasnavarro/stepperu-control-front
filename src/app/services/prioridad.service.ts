import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Prioridad } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PrioridadService {
  private prioridades: Prioridad[] = [];

  constructor( private http: HttpClient) { }

  listarPrioridades(){
    if ( this.prioridades.length > 0){
      //no tenemos prioridades
      console.log('Desde caché');
      return of(this.prioridades);
    } else{
      console.log('Desde internet');
      return this.http.get<Prioridad[]>(`${ environment.url }/prioridad`)
      .pipe(
        tap(
          prioridades => this.prioridades = prioridades
          ) 
        );
      }
  }
}
