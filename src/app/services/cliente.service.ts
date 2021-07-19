import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Cliente } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientes: Cliente[] = [];
  
  constructor( private http: HttpClient) { }

  listarClientes(){
    if ( this.clientes.length > 0){
      //no tenemos clientes
      console.log('Desde caché');
      return of(this.clientes);
    } else{
      console.log('Desde internet');
      return this.http.get<Cliente[]>(`${ environment.url }/cliente`)
      .pipe(
        tap(
          clientes => this.clientes = clientes
          ) 
        );
      }
  }

}
