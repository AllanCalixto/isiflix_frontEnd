import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { Pedido } from 'src/app/model/Pedido';
import { CategoriaService } from 'src/app/servicos/categoria.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public lista: Categoria[] = [];
  public numItens: number = 0;
  public pedido!: Pedido;

  constructor(private service:CategoriaService) { }

  ngOnInit(): void {

    const carrinhoString = localStorage.getItem("LeetirCarrinho")
    this.pedido = carrinhoString ? JSON.parse(carrinhoString) : {};
    if (this.pedido && Array.isArray(this.pedido.itensPedido)) {
      this.numItens = this.pedido.itensPedido.length;
  } else {
      this.numItens = 0; // Define como 0 se itensPedido não existir
  }


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
