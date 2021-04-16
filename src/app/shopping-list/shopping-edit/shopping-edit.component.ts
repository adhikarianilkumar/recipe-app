import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef!: ElementRef;
  // @ViewChild('amountInput') amountInputRef!: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f') slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startEditing.subscribe(
      (index: number)=>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
      );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    // this.slService.addIngredient(
    //   new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value)
    // );
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(index: number){
    this.slService.deleteIngredient(index);
    this.onClear();
  }

}
