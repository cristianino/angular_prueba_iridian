import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacto } from '../models/contacto';
import { Observable } from 'rxjs';
import { AreaDeContacto } from '../models/area-de-contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private apiUrl = 'http://localhost:8000/api/contacto';

  constructor(private http: HttpClient) { }

  enviarContacto(contacto: Contacto): Observable<any> {
    return this.http.post(this.apiUrl, contacto);
  }

  getAreasDeContacto(): Observable<AreaDeContacto[]> {
    return this.http.get<AreaDeContacto[]>('http://localhost:8000/api/areas-de-contacto');
  }
}
