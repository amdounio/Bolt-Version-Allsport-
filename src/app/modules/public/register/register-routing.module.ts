import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { UserDescriptionComponent } from './user-description/user-description.component';
import { FavoriteSportsComponent } from './favorite-sports/favorite-sports.component';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';
import { SubscriptionNeedsComponent } from './subscription-needs/subscription-needs.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'user-description', component: UserDescriptionComponent },
  { path: 'favorite-sports', component: FavoriteSportsComponent },
  { path: 'choose-plan', component: ChoosePlanComponent },
  { path: 'subscription-needs', component: SubscriptionNeedsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
