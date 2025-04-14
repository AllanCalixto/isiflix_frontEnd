import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/servicos/categoria.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public lista: Categoria[] = [];

  constructor(private service:CategoriaService) { }

  ngOnInit(): void {
    this.service.getAllCategorias()
    .subscribe({
      next: (res: Categoria[]) => {
        console.log("Lista de categorias: ", res);
        this.lista = res;
      },
      error: (err) => {
        console.log("Erro ao listar as categorias: ", err);
      },
      complete: () => {
        console.log("Lista de categorias concluida!");
      }
    });
  }

}
