import { NgModule } from "../../../node_modules/@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { RecipeService } from "../recipes/recipe.service";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        // sharedmodule needed for dropdown directive in header
        SharedModule,
        // need routing module for links in header to work
        AppRoutingModule
    ],
    exports: [
        // also need app routing in other modules so need to export
        AppRoutingModule,
        // need to export header as using app-header selector in html template
        HeaderComponent
    ],
    // can use services added in providers in every component
    providers: [
        ShoppingListService,
        RecipeService,
        DataStorageService,
        AuthService,
    ]
})

export class CoreModule {}