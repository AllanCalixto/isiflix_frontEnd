import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  public getAllProdutos(): Observable<Produto[]> {
    console.log("Estou no PRODUTO SERVICE - Entrei em contato com o Backend");
    return this.http.get<Produto[]>("http://localhost:8080/produto");
  }
}
