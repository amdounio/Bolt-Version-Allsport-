import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Championship } from '../../../models/championship.model';
import { Sport } from '../../../models/sports.model';
import { ChampionshipService } from '../../../services/championship.service';

@Component({
  selector: 'app-sports-list',
  templateUrl: './sports-list.component.html',
  styleUrl: './sports-list.component.scss'
})
export class SportsListComponent {
  title : string = 'sports';
  subTitle : string = 'choose your discipline';
  isSportItemSelected: boolean = false

  sportsList: Sport[] = [
    {
      id: 1,
      image: "/assets/images/football.png",
      title: "Football",
      subTitle: "c'La rentrée du football français c’est maintenant !",
      firstColorGradientOverlay: 'rgba(0, 67, 145, 0)',
      secondColorGradientOverlay: 'rgba(0, 20, 43, 0.82)',
      disabled : false
    },
    {
      id: 2,
      image: "/assets/images/nba.png",
      title: "NBA",
      subTitle: "c'La rentrée du football français c’est maintenant !",
      firstColorGradientOverlay: '#91000000',
      secondColorGradientOverlay: '#2B0000D1',
      disabled : true
    },
    {
      id: 3,
      image: "/assets/images/mma.png",
      title: "MMA",
      subTitle: "c'La rentrée du football français c’est maintenant !",
      firstColorGradientOverlay: '#16161600',
      secondColorGradientOverlay: '#151515D1',
      disabled : true
    },
    {
      id: 4,
      image: "/assets/images/soon.png",
      title: "À VENIR",
      subTitle: "c'La rentrée du football français c’est maintenant !",
      firstColorGradientOverlay: '#4D4D4D00',
      secondColorGradientOverlay: '#101010D1',
      disabled : true
    },
    {
      id: 5,
      image: "/assets/images/soon.png",
      title: "À VENIR",
      subTitle: "c'La rentrée du football français c’est maintenant !",
      firstColorGradientOverlay: '#4D4D4D00',
      secondColorGradientOverlay: '#101010D1',
      disabled : true
    },

  ]

  championshipList: Championship[] = []


  constructor(private router: Router) { }


  selectSport(item: Sport) {
    if (!item.disabled) {
      this.router.navigate(['/dashboard/championships'],{queryParams: {id : item.id}})
    }
  }

  


}
