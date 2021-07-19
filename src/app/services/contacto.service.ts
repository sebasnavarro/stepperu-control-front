import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contacto } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private contactos: Contacto[] = [];

  constructor( private http: HttpClient) { }

  listarContactos(clienteID: number){
    if ( this.contactos.length > 0){
      //no tenemos contactos
      console.log('Desde caché');
      return of(this.contactos);
    } else{
      console.log('Desde internet');
      return this.http.get<Contacto[]>(`${ environment.url }/contacto/cliente/${clienteID}`)
      .pipe(
        tap(
          contacto => this.contactos = contacto
          ) 
        );
      }
  }
}
