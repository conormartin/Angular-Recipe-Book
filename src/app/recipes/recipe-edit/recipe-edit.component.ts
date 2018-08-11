import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  // get current url with ActivatedRoute
  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    // retrieve id from url & parse to number
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // check if params has an id, if not then want to create new recipe rather than edit
        this.editMode = params['id'] != null;
        // call below initForm() function when component loads to initialise form
        this.initForm();
      }
    )
  }

  // function to run when submit button clicked
  onSubmit() {
    // if in editMode, update existing recipe by passing in form value, else create new recipe
    // form.value already in same format as Recipe model so can just pass in whole object
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    // call cancel method defined below to navigate back one level in route
    this.onCancel();
  }

  // add new ingredient in edit mode
  onAddIngredient() {
    // need to explicitely cast to FormArray
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        // Validators.pattern() ensures form input must match specified regex pattern
        'amount': new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  // on delete, call removeAt function which removes element at specified index
  onDeleteIngredient(index: number) {
    // need to explicitely cast FormArray
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  // when cancel button clicked, go back one level in route
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  // method to run when form initialised
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    // if in editMode, get recipe by passing id into service function
    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      // assign recipe properties to local vars
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      // if recipe has ingredients, cycle through array and push each as new FormGroup
      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              // pattern matches regex between two / keys
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    // initialise new form reactively and pass in local vars
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }
}
