import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private igChangedSub!: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igChangedSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    this.loggingService.printLog('ShoppingListComponent ngInit!');
  }

  ngOnDestroy(): void {
    this.igChangedSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.slService.startEditing.next(index);
  }
}
