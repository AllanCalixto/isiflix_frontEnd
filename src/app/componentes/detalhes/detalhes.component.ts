import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemPedido } from 'src/app/model/ItemPedido';
import { Pedido } from 'src/app/model/Pedido';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  public produtoDetalhe!: Produto;
  public quantidade: number = 1;

  constructor(private route: ActivatedRoute, private service: ProdutoService, private nav: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(parameter => {
      this.recuperaProduto(parameter["id"]);
    })
  }

  public recuperaProduto(id: number) {
    this.service.getProdutoPeloId(id)
      .subscribe({
        next: (prod: Produto) => {
          this.produtoDetalhe = prod;
        },
        error: (err) => {
          alert("Produto Inválido!");
        }
      });
  }

  public adicionarCarrinho() {
    let pedido: Pedido;
    pedido = localStorage.getItem("LeetirCarrinho")
      ? JSON.parse(localStorage.getItem("LeetirCarrinho")!)
      : new Pedido();

    if (!pedido.itensPedido) {
      pedido.itensPedido = [];
    }

    if (!pedido.valorTotal) {
      pedido.valorTotal = 0;
    }
    let item: ItemPedido = new ItemPedido();
    item.qtdeItem = this.quantidade;
    item.produto = this.produtoDetalhe;
    item.precoUnitario = this.produtoDetalhe.preco;
    item.precoTotal = item.precoUnitario * item.qtdeItem;

    console.log(JSON.stringify(item));

    pedido.itensPedido.push(item);
    pedido.valorTotal = pedido.valorTotal + item.precoTotal;

    localStorage.setItem("LeetirCarrinho", JSON.stringify(pedido));
  }

}

