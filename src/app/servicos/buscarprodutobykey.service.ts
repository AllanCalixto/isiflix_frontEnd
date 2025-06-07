import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarprodutobykeyService {

  private keyword!:BehaviorSubject<string>;

  constructor() {
    this.keyword = new BehaviorSubject("");
   }

  public getKeyword() {
    return this.keyword;
  }
}