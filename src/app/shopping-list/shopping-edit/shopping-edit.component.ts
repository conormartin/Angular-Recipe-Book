import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // get form ref using ViewChild
  @ViewChild('f') slForm: NgForm;
  // create subscruption object to store method in onInit
  subscription: Subscription;
  // variable to track whether in edit mode
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    // subscribe to subject and change edit mode to true if fired
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        // get ingredient at index and set form values to its properties
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    // create new ingredient using input values obtained from form object
    const newIngredient = new Ingredient(value.name, value.amount);
    // update item instead of adding new ingredient if editmode=true, else add new ingredient
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    // leave edit mode and reset form once submit button clicked
    this.editMode = false;
    form.reset();
  }

  // when clear button clicked, reset form and set editmode back to false
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  // when delete button clicked, call delete method from service & pass in index
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    // call above onClear() method to clear form once item deleted
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
