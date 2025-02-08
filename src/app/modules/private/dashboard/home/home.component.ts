import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sport } from '../../../models/sports.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title: string = 'on display'
  subTitle: string = 'events not to be missed'
  sportsList : Sport[] = [
    {
      id : 61,
      title : 'Ligue 1',
      description : "La rentrée du football français c’est maintenant !",
      image : '/assets/images/lige1.png',
      disabled : false

    },
    {
      id : 140,
      title : 'la liga',
      description : "La rentrée du football Espagnole c’est maintenant !",
      image : '/assets/images/la-liga.png',
      disabled : false

    },
    {
      id : 2,
      title : 'la ligue des champions',
      description : "La rentrée du football français c’est maintenant !",
      image : '/assets/images/champions-league.png',
      disabled : false
    },
    {
      id : 4,
      title : 'à venir',
      description : "La rentrée du football français c’est maintenant !",
      image : '/assets/images/champions-league.png',
      disabled : true
    }
  ]

  constructor(private router : Router){}

  selectLeague(sport:Sport){
    if (!sport.disabled) {
      this.router.navigate(['dashboard/matchs'], { queryParams: { id: sport.id, name: sport.title } });
    }
  }

}
