import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[]=[
    new Recipe('Veg. Manchurian', 
    'Desi Chinese loved by Indians', 
    'https://bigoven-res.cloudinary.com/image/upload/sweetandsourstickythaiboneless-3a944d.jpg',
  [
    new Ingredient('soya sauce', 1),
    new Ingredient('onions', 3),
    new Ingredient('Manchurian balls', 20),
    new Ingredient('corn flour', 2)
  ]),
    new Recipe('Cheese Burst Pizza', 
    'Heavily loaded cheese', 
    'https://cdn.pixabay.com/photo/2017/08/06/06/43/pizza-2589575_640.jpg',
  [
    new Ingredient('Mozrella Cheese', 5),
    new Ingredient('Bread', 1),
    new Ingredient('Oregano', 3),
    new Ingredient('Capsicum', 4),
  ])
  ];

  constructor(private shoppingListService : ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
