import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  public buscarClientePeloCPF(cpf:string): Observable<Cliente> {
    return this.http.get<Cliente>("http://localhost:8080/cliente/"+cpf);
  }
}
