import { Categoria } from "./Categoria";

export class Produto {
    public id: number;
    public nome: string;
    public detalhe: string;
    public linkFoto: string;
    public preco: number;
    public disponivel: number;
    public categoria: Categoria

    constructor(id: number, nome: string, detalhe: string, linkFoto: string, preco: number, disponivel: number, categoria: Categoria) {
        this.id = id;
        this.nome = nome;
        this.detalhe = detalhe;
        this.linkFoto = linkFoto;
        this.preco = preco;
        this.disponivel = disponivel;
        this.categoria = categoria;
    }
}