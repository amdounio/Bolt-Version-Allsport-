import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        // Check if user is authenticated using SocialLogin (or authService if needed)
        const currentUser = this.authService.getUser(); // Assuming you have a method in your authService to retrieve user info

        if (!currentUser || !currentUser.id) {
            // User is not authenticated, redirect to login
            this.router.navigate(['/login'], {
                queryParams: { returnUrl: state.url }
            });
            return false;
        }

        // User is authenticated
        return true;
    }
}
