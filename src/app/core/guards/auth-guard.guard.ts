import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { User } from "@codetrix-studio/capacitor-google-auth";

@Injectable()
export class AuthGuard implements CanActivate {
    private user: User = <User>{};
    constructor(private router: Router, private authService: AuthenticationService) { 
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ):
        | boolean
        | import('@angular/router').UrlTree
        | import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
        | Promise<boolean | import('@angular/router').UrlTree> {
            console.log(this.authService.getUser().id);
            
                if(this.authService.getUser().id === undefined){
                    this.authService.logout();
                }else{
                    this.router.navigate(['/dashboard'])
                }
                return false
    
    }

    

    
}