import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlModel } from '../models/control.model';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  private url = 'http://stepperu-control.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  crearControl(control: ControlModel){

    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post(`${this.url}/control.json`, control,{headers});
  }


}
