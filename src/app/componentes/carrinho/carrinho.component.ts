import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/model/Pedido';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})

export class CarrinhoComponent implements OnInit {
  public pedido!: Pedido;
  public vazio!: Boolean;

  constructor() {

  }

  ngOnInit(): void {
    const carrinhoString = localStorage.getItem("LeetirCarrinho")
    this.pedido = carrinhoString ? JSON.parse(carrinhoString) : {};
    if(!this.pedido) {
      this.vazio = true;
    }
    else {
      this.vazio = false;
    }
  }

  public removerItem(idProduto: number) {
    let i: number;
    for (i = 0; i < this.pedido.itensPedido.length; i++) {
        if (this.pedido.itensPedido[i].produto.id == idProduto) {
            alert("Removendo produto: " + this.pedido.itensPedido[i].produto.nome);
            this.pedido.valorTotal -= this.pedido.itensPedido[i].precoTotal;
            this.pedido.itensPedido.splice(i, 1);
            break;
        }
    }
    this.pedido.valorTotal = this.pedido.itensPedido.reduce((acc, item) => acc + item.precoTotal, 0);
    localStorage.setItem("LeetirCarrinho", JSON.stringify(this.pedido));
}
}