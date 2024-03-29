import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(+params['id']);
    });
  }

  // You can do it with ShoppingListService also
  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }


  onEditRecepe(){
    // this.router.navigate(['edit'], { relativeTo: this.route });
    // OR construct route maybe for complex navigation
    this.router.navigate(['../', this.id,'edit'], { relativeTo: this.route });
  }

  onDeletRecipe(){
    this.recipeService.deletRecipe(this.id);
    this.router.navigate(['/recipes'])
  }

}
