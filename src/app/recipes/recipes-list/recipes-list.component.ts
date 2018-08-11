import { Component, OnInit, OnDestroy } from '@angular/core';
// import recipe class from model file
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  // local array to be injected with service data
  recipes: Recipe[];
  subscription: Subscription;

  // constructor for service injection
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    // subscribe to changes in Recipe array and update with new array
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    // inject data from service into array using getter method
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  // unsubscribe to subscription to avoid memory leaks
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
