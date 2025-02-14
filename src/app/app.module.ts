import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './modules/public/login/login.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { googleClientId } from './shared/constant';

import { HTTP_INTERCEPTORS, provideHttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotificationComponent } from './shared/components/notification/notification.component';
import { LandingComponent } from './modules/public/landing/landing.component';
import { LoadingSigninComponent } from './modules/public/loading-signin/loading-signin.component';
import { GoogleSignInButtonComponent } from './shared/components/google-sign-in-button/google-sign-in-button.component';
import { NgOptimizedImage } from '@angular/common';
import { AuthGuard } from './core/guards/auth-guard.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { NotificationPopupComponent } from './shared/components/notification-popup/notification-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    LoadingSigninComponent,
    GoogleSignInButtonComponent,
    NotificationComponent,
    NotificationPopupComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgOptimizedImage,
    GoogleSigninButtonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      toastComponent: NotificationComponent,
    }),
    NgbModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    NoAuthGuard,
    AuthGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(googleClientId),
          },
        ],
        onError: (err: any) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    SocialAuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}