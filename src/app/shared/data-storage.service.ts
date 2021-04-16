import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  private firebaseUrl =
    'https://ng-recipe-book-project-c43b6-default-rtdb.firebaseio.com/';

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(this.firebaseUrl + 'recipes.json', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.firebaseUrl + 'recipes.json').pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
