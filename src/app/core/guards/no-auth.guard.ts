import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { SocialLogin } from '@capgo/capacitor-social-login';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        const currentUser = this.authService.getUser();  // Assuming you have a method in your authService that gets the user

        const currentUrl = this.router.url;

        console.log("dashboard");
        console.log(currentUrl);

        // Check if the user is authenticated, you may want to check this with your authService or SocialLogin directly
       /* if (currentUser) {
            // User is authenticated, redirect to dashboard
            if (currentUrl !== '/register/user-description') {
                this.router.navigate(['/dashboard']);
                return false;
            }
        }*/
        
        // Allow access to login page if no user or user is not authenticated
        return true;
    }
}
