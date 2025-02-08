import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/public/login/login.component';
import { LandingComponent } from './modules/public/landing/landing.component';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth-guard.guard';

const routes: Routes = [
  {path : '', component:LandingComponent },
  {path : 'login', component:LoginComponent},
  { path: 'register', loadChildren: () => import('./modules/public/register/register.module').then(m => m.RegisterModule) },
  { path: 'dashboard', loadChildren: () => import('./modules/private/dashboard/dashboard.module').then(m => m.DashboardModule)  },
  

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
