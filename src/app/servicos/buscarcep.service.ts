import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnderecoCEP } from '../model/EnderecoCEP';

@Injectable({
  providedIn: 'root'
})
export class BuscarcepService {

  constructor(private http: HttpClient) { }

public buscarCEP(cep: string): Observable<EnderecoCEP> {
  return this.http.get<EnderecoCEP>(`http://viacep.com.br/ws/${cep}/json`);
}
}
