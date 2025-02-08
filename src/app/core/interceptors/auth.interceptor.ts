import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { NotificationService } from "../../shared/services/notification.service";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthenticationService,
        private notificationService: NotificationService
    ) {}

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            console.log(err);
            this.notificationService.Error(err.error.error);
            this.authService.logout();
            return of(err.message);
        }
        return throwError(err);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const authToken = this.authService.getAccessToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });
        return next.handle(authRequest).pipe(
            catchError(err => this.handleAuthError(err))
        );
    }
}
