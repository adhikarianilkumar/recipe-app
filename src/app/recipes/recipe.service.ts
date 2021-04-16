import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'One',
  //     'This is just a test recipe',
  //     'https://www.eatwell101.com/wp-content/uploads/2019/08/tuscan-salmon-recipe.jpg',
  //     [
  //       new Ingredient('Apple', 1),
  //       new Ingredient('Tomatoes', 10)
  //     ]
  //     ),
  //   new Recipe(
  //     'Two',
  //     'This is just a test recipe',
  //     'https://www.eatwell101.com/wp-content/uploads/2019/08/tuscan-salmon-recipe.jpg',
  //     [
  //       new Ingredient('Apple', 2),
  //       new Ingredient('Tomatoes', 20)
  //     ]
  //     ),
  //   new Recipe(
  //     'Three',
  //     'This is just a test recipe',
  //     'https://www.eatwell101.com/wp-content/uploads/2019/08/tuscan-salmon-recipe.jpg',
  //     [
  //       new Ingredient('Apple', 3),
  //       new Ingredient('Tomatoes', 30)
  //     ]
  //     )
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService){}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deletRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
