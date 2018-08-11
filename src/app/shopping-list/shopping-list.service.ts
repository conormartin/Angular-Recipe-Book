import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    // inform component that new data is available using Subject
    ingredientsChanged = new Subject<Ingredient[]>();
    // new subject to listen for edit event
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    // getter to access array
    getIngredients() {
        // slice makes copy rather than returning access to memory address
        return this.ingredients.slice();
    }

    // get specific ingredient at index passed in
    getIngredient(index: number) {
        return this.ingredients[index];
    }

    // setter to push to array
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        //call next() to pass data to observer when new ingredient added
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // spread(...) converts an array to a list
        // needed as pushing whole array will create nested arrays instead of just pushing elements
        this.ingredients.push(...ingredients);
        // call next() to pass data to observer when ingredients changed
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // method to update existing ingredient if update button clicked
    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        // emit updated ingredient
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}