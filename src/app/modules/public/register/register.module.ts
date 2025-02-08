import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { UserDescriptionComponent } from './user-description/user-description.component';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';
import { SubscriptionNeedsComponent } from './subscription-needs/subscription-needs.component';
import { FavoriteSportsComponent } from './favorite-sports/favorite-sports.component';
import { SharedModule } from '../../../shared/shared.module';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { IonicModule } from '@ionic/angular';
import { HeadingComponent } from 'src/app/shared/components/heading/heading.component';


@NgModule({
  declarations: [
    RegisterComponent,
    UserDescriptionComponent,
    ChoosePlanComponent,
    SubscriptionNeedsComponent,
    FavoriteSportsComponent,
    // HeadingComponent
  ],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    GoogleSigninButtonModule,

  ]
})
export class RegisterModule { }
