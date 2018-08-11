import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../auth/auth-guard.service";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const recipesRoutes: Routes = [
    // children refers to any path inside /recipes/ path
    { path: '', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent },
        // can activate takes array of auths, means route only accessable if AuthGuard returns true
        { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
        { path: ':id', component: RecipesDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
    ] },
]

@NgModule({
    // use forChild() for imports everywhere except route app module
    imports: [
        RouterModule.forChild(recipesRoutes)
    ],
    exports: [RouterModule]
})

export class RecipesRoutingModule {}