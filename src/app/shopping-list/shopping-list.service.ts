import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients : Ingredient[] = [
    new Ingredient('Apple',10),
    new Ingredient('Tomato',5)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients : Ingredient[]){
    const uniqueIngredients = ingredients.filter(newIngredient =>
      !this.ingredients.some(existingIngredient =>
        existingIngredient.name === newIngredient.name &&
        existingIngredient.amount === newIngredient.amount
      )
    );

    this.ingredients.push(...uniqueIngredients);
    this.ingredientsChanged.next(this.ingredients.slice());
    // this.ingredients.push(...ingredients);
    // this.ingredientsChanged.emit(ingredients);
  }
}
