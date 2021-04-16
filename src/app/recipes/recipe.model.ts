import { Ingredient } from "../shared/ingredient.model";

// To see another way of creating class with constructor see file name "ingredien.model.ts"
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients!: Ingredient[];

  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]){
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
