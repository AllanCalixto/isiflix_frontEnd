import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/model/Pedido';
import { CarrinhoService } from 'src/app/servicos/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})

export class CarrinhoComponent implements OnInit {
  public pedido!: Pedido;
  public vazio!: Boolean;

  constructor(private route: Router, private carService: CarrinhoService) {

  }

  public continuar() {
    this.route.navigate(["/"]);
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
    this.carService.getNumberOfItems().next(this.pedido.itensPedido.length);
}

  public efetivar() {
    if(this.pedido.itensPedido.length > 0) {
      this.route.navigate(['/efetivarpedido']);
    }
    else {
      this.route.navigate(['/destaques']);
    }
  }

}