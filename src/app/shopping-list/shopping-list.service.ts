import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients : Ingredient[] = [
    new Ingredient('Apple',10),
    new Ingredient('Tomato',5)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
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

  updateIngredient(index: number, editedIngredient: Ingredient){
    this.ingredients[index] = editedIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredeint(index: number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
