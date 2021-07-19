import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Responsable } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  private responsables: Responsable[] = [];

  constructor( private http: HttpClient) { }

  listarResponsables(){
    if ( this.responsables.length > 0){
      //no tenemos responsables
      console.log('Desde caché');
      return of(this.responsables);
    } else{
      console.log('Desde internet');
      return this.http.get<Responsable[]>(`${ environment.url }/responsable`)
      .pipe(
        tap(
          responsables => this.responsables = responsables
          ) 
        );
      }
  }
}
