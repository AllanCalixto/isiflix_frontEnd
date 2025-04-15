import { ItemPedido } from "./ItemPedido";

/* Aqui fazemos o objeto Pedido, porém ele funciona como nosso carrinho de compras */
export class Pedido {
    public itensPedido!: ItemPedido[];
    public valorTotal!: number;

}