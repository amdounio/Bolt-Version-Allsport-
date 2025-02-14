import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/public/login/login.component';
import { LandingComponent } from './modules/public/landing/landing.component';
import { LoadingSigninComponent } from './modules/public/loading-signin/loading-signin.component';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth-guard.guard';

const routes: Routes = [
  { path: 'loading-signin', component: LandingComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoadingSigninComponent, canActivate: [NoAuthGuard] },
  { path: '', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', loadChildren: () => import('./modules/public/register/register.module').then(m => m.RegisterModule), canActivate: [NoAuthGuard] },
  { path: 'dashboard', loadChildren: () => import('./modules/private/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  // Redirect all unknown paths to login
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}