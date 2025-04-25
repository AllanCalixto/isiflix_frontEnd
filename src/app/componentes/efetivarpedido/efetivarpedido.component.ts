import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { Pedido } from 'src/app/model/Pedido';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { PedidoService } from 'src/app/servicos/pedido.service';

@Component({
  selector: 'app-efetivarpedido',
  templateUrl: './efetivarpedido.component.html',
  styleUrls: ['./efetivarpedido.component.css']
})
export class EfetivarpedidoComponent implements OnInit {
  public cliente: Cliente;
  public achou: boolean;
  public visivel: boolean;
  public pedido: Pedido;

  constructor(private cliService: ClienteService, private pedService: PedidoService, private router: Router) {
    this.cliente = new Cliente();
    this.pedido = new Pedido();
    this.achou = false;
    this.visivel = false;
  }

  ngOnInit(): void {
  }

  public buscarTelefone() {
    this.cliService.buscarClientePeloTelefone(this.cliente.telefone)
      .subscribe((cli: Cliente) => {
        this.cliente = cli;
        this.achou = true;
        this.visivel = true;
        console.log(this.cliente);
      },
        (err) => {
          if (err.status = 404) {
            // deu certo mas a pesquisa não retornou o cliente com esse telefone = é novo cliente.
            this.visivel = true;
          }
          else {
            alert("Erro desconhecido!!" + err)
          }
        });
  }

  public finalizarPedido() {
    let pedidoTmp: Pedido | null;
    pedidoTmp = localStorage.getItem("LeetirCarrinho")
      ? JSON.parse(localStorage.getItem("LeetirCarrinho")!)
      : null;

    if (pedidoTmp) {
      this.pedido.itensPedido = pedidoTmp.itensPedido;
      this.pedido.valorTotal = pedidoTmp.valorTotal;
      this.pedido.cliente = this.cliente;
      this.pedido.status = 0;

      console.log(this.pedido);

      this.pedService.inserirNovoPedido(this.pedido)
        .subscribe({
          next: (res: Pedido) => {
            alert("Pedido Efetivado = número " + res.idPedido);
            localStorage.removeItem("LeetirCarrinho");
            this.router.navigate(["/recibo", res.idPedido]);
          },
          error: (err) => {
            alert("Não consegui efetivar o pedido - desculpe!");
          }
        });
    }
  }
}