import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators"
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    // inject Http service into constructor
    constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        // get user id token from storage
        const token = this.authService.getIdToken()

        // put allows overwriting of existing data through firebase
        // http methods dont access db themselves, just create an observable with url, data and headers
        // append token to url to ensure only authenticated users can save to db
        return this.http.put('https://recipebook-302be.firebaseio.com/recipes.json'+token, this.recipeService.getRecipes());
    }

    // creates observable which gets data from db when fired
    getRecipes() {
        // get user id token from storage
        const token = this.authService.getIdToken()
            
        // map function allows db response to be transformed
        // if recipe doesnt have ingredients array, add blank one to ensure Recipe module is consistent
        // append token to request url
        this.http.get('https://recipebook-302be.firebaseio.com/recipes.json?auth='+token)
            .pipe(map(
                (response: Response) => {
                    // Response.json() function parses json to js object
                    const recipes: Recipe[] = response.json();
                    for(let recipe of recipes) {
                        if(!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            ))
            .subscribe(
                (recipes: Recipe[]) => {
                    // get recipes from firebase and display 
                    this.recipeService.setRecipes(recipes);
                }
            )
    }
}