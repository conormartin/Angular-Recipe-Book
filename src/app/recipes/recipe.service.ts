import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";

// need Injectable as injecting recipe to shopping list component
@Injectable()
export class RecipeService {
  // create new Subject to update whenever a recipe is changed
  recipesChanged = new Subject<Recipe[]>();

  // array holding array of recipe objects
  private recipes: Recipe[] = [
    // recipe must have name, desc and imagePath
    new Recipe(
      'Fish and Chips', 
      'Recipe for fish and chips', 
      'https://images.unsplash.com/photo-1524334788144-6dc88da21500?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=46507e188428bfb7dbe2413ab55af741&auto=format&fit=crop&w=500&q=60',
      [
        new Ingredient('Fish', 1),
        new Ingredient('Chips', 30),
        new Ingredient('Peas', 100)
      ]),
    new Recipe(
      'Cheeseburger', 
      'Recipe for a basic cheeseburger!', 
      'https://images.unsplash.com/photo-1477617722074-45613a51bf6d?ixlib=rb-0.3.5&s=f6e4190deb1f021cfa65d8c03012d9ac&auto=format&fit=crop&w=500&q=60',
      [
        new Ingredient('Beef Burger', 1),
        new Ingredient('Bun', 2),
        new Ingredient('Chips', 20)
      ]) 
    ];

  // inject service i constructor to pass data from recipe to shopping list
  constructor(private shoppingListService: ShoppingListService) {}

    // takes in array of recipes and replaces local array with passed in one
    // used when getting data from firebase
    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

  // getter method to access array
  getRecipes() {
    // slice returns copy of array rather than same memory address
    return this.recipes.slice();
  }

  // load single recipe using id retrieved from url
  getRecipe(index: number) {
    return this.recipes[index];
  }

  // method to pass data from recipe to shopping list component
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  // push new recipe to array and emit changed array
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  // get recipe at specified index and replace with passed in recipe
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  // splice element at index position and emit changes through Subject
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}