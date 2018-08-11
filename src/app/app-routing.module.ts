import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { HomeComponent } from "./core/home/home.component";

// specify routes and which components to load/redirect to
const appRoutes: Routes = [
    // pathMatch:full ensures redirect only happens on exact '/' path
    // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    // lazy loading recipe component so it doesnt load as soon as page loads
    // use loadChildren & reference component location then # and exported class name
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    { path: 'shopping-list', component: ShoppingListComponent },
];

// need @NgModule to configure as a module rather than normal ts file
@NgModule({
    // pass routes var into forRoot method of RouterModule and export 
    // preloadingStrategy loads lazy loaded modules in the background
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule {

}