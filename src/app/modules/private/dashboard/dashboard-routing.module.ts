import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SportsListComponent } from './sports-list/sports-list.component';
import { HomeComponent } from './home/home.component';
import { MatchsComponent } from './matchs/matchs.component';
import { MediaComponent } from './media/media.component';
import { ProfilComponent } from './profil/profil.component';
import { ChampionshipsComponent } from './championships/championships.component';
import { GeneratedMediaComponent } from './generated-media/generated-media.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';

const routes: Routes = [
  // { path: '', component: DashboardComponent },
  { path: 'sports', component: SportsListComponent },
  { path: 'championships', component: ChampionshipsComponent },
  { path: 'matchs', component: MatchsComponent },
  { path: 'media', component: MediaComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'edit-profil', component: EditProfilComponent },
  { path: 'generated-media', component: GeneratedMediaComponent },
  { path: '', component: HomeComponent }
]
  ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
