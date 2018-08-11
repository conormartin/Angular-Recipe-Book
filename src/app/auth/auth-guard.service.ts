import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

// injectable as want to inject AuthService
@Injectable()
// need to implement CanActivate interface for auth guards
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService){}

    // canActivate function takes in current route & router state
    // isAuthenticated function returns true or false depending on whether user has token
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isAuthenticated();
    }
}