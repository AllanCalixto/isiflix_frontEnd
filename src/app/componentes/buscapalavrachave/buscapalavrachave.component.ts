import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { BuscarprodutobykeyService } from 'src/app/servicos/buscarprodutobykey.service';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-buscapalavrachave',
  templateUrl: './buscapalavrachave.component.html',
  styleUrls: ['./buscapalavrachave.component.css']
})
export class BuscapalavrachaveComponent implements OnInit {

  public keyword!: string;
  public lista: Produto[] = [];

constructor(
    private busca: BuscarprodutobykeyService,
    private service: ProdutoService
) {
    this.busca.getKeyword().subscribe((res: string) => {
        this.keyword = res;

        this.service.getProdutosPelaPalavraChave(this.keyword).subscribe((res: any) => {
            this.lista = res as Produto[];
        });
    });
}

  ngOnInit(): void {
  }

}
