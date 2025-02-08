import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { User } from "@codetrix-studio/capacitor-google-auth";

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    private user: User = <User>{};

    constructor(private router: Router, private authService: AuthenticationService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log('NoAuthGuard#canActivate called');
        const currentUser = this.authService.getUser();
        console.log('Current User:', currentUser);

        if (currentUser && currentUser.id) {
            console.log('User authenticated, redirecting to dashboard');
            // Prevent navigation loop by only redirecting if the target URL is not the current URL
            if (state.url !== '/dashboard') {
                this.router.navigate(['/dashboard']);
            }
            return false; // Prevent access to the route if the user is authenticated
        }

        console.log('User not authenticated, access granted');
        return true; // Allow access if the user is not authenticated
    }
}
