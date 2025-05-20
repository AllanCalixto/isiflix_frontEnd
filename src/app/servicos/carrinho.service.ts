import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private numberOfItens: BehaviorSubject<number>;

  constructor() {
    this.numberOfItens = new BehaviorSubject<number>(0);
   }

   public getNumberOfItems() {
    return this.numberOfItens;
   }
}
