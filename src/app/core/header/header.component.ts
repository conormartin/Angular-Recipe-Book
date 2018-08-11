import { Component } from "@angular/core";
import { DataStorageService } from "../../shared/data-storage.service";
import { Response } from "@angular/http";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent{
    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

    // function runs when save button clicked, 
    // listens for changes on http observable and sends request to db
    onSaveData() {
        this.dataStorageService.storeRecipes().subscribe(
            (response: Response) => {
                console.log(response);
            }
        )
    }
    // updates data with new data in firebase
    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    // firebase logout method
    onLogout() {
        this.authService.logout();
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}