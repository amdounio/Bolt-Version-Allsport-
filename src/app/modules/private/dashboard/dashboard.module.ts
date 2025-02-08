import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../../shared/shared.module';
import { SportsListComponent } from './sports-list/sports-list.component';
import { HomeComponent } from './home/home.component';
import { MatchsComponent } from './matchs/matchs.component';
import { SliderComponent } from './slider/slider.component';
import { BackgroundsComponent } from './backgrounds/backgrounds.component';
import { MediaComponent } from './media/media.component';
import { ProfilComponent } from './profil/profil.component';
import { IonicModule } from '@ionic/angular';
import { HeadingComponent } from 'src/app/shared/components/heading/heading.component';
import { ChampionshipsComponent } from './championships/championships.component';
import { GeneratedMediaComponent } from './generated-media/generated-media.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SportsListComponent,
    HomeComponent,
    MatchsComponent,
    SliderComponent,
    BackgroundsComponent,
    MediaComponent,
    ProfilComponent,
    // HeadingComponent,
    ChampionshipsComponent,
    GeneratedMediaComponent, 
    EditProfilComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgOptimizedImage,
    IonicModule.forRoot(),
  ]
})
export class DashboardModule { }
