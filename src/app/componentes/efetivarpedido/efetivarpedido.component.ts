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

  public isCPFValid(): boolean {
    if (!this.cliente.cpf || this.cliente.cpf.length == 0) {
      return false;
    }

    let cpf = this.cliente.cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    console.log(`CPF formatado: ${cpf}`);

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      console.log("CPF inválido: sequência repetida ou número incorreto de dígitos.");
      return false;
    }

    // atribuir o cpf desformatado para o cpf do cliente
    this.cliente.cpf = cpf;

    let digitos: number[] = cpf.split("").map(i => +i);
    console.log(`Dígitos extraídos: ${digitos}`);

    // Cálculo do primeiro dígito verificador
    let soma1 = 0;
    for (let i = 0; i < 9; i++) {
      soma1 += digitos[i] * (10 - i);
    }
    let resto1 = soma1 % 11;
    let primeiroDigito = resto1 < 2 ? 0 : 11 - resto1;

    console.log(`Soma1: ${soma1}, Resto1: ${resto1}, Primeiro Dígito Calculado: ${primeiroDigito}`);

    if (digitos[9] !== primeiroDigito) {
      console.log("Primeiro dígito verificador inválido.");
      return false;
    }

    // Cálculo do segundo dígito verificador
    let soma2 = 0;
    for (let i = 0; i < 10; i++) {
      soma2 += digitos[i] * (11 - i);
    }
    let resto2 = soma2 % 11;
    let segundoDigito = resto2 < 2 ? 0 : 11 - resto2;

    console.log(`Soma2: ${soma2}, Resto2: ${resto2}, Segundo Dígito Calculado: ${segundoDigito}`);

    if (digitos[10] !== segundoDigito) {
      console.log("Segundo dígito verificador inválido.");
      return false;
    }

    console.log("CPF válido!");
    return true;
  }

  // renomear para buscarCPF()
  public buscarTelefone() {
    if (!this.isCPFValid()) {
      let btnModal = document.getElementById("btnModal");
      if (btnModal) {
        btnModal.click();
      }
      return;
    }
    this.cliService.buscarClientePeloCPF(this.cliente.cpf)
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