import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/Categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  public getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>("http://localhost:8080/categoria");
  }
}
