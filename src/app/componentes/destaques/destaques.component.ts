import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/servicos/produto.service';


@Component({
  selector: 'app-destaques',
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.css']
})
export class DestaquesComponent implements OnInit {

  public lista: Produto[] = [];

  // Preciso injetar o servico que busca o produto
  constructor(private service: ProdutoService) { 
    console.log("Estou no construtor do componente!!");
  }

  ngOnInit(): void {
    console.log("LISTA DE PRODUTOS: ", this.lista);
    console.log("Estou na inicialização do componente!");
    this.service.getAllProdutos()
          .subscribe({
            next: (res: Produto[]) => {
              console.log("Produtos recebidos:", res);
              this.lista = res;
            },
            error: (err) => {
              console.error("Erro ao buscar produtos:", err);
            },
            complete: () => {
              console.log("Requisição concluída");
            }          
          });
  }

}
