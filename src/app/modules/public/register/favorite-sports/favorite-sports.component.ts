import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../models/user.model';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-sports',
  templateUrl: './favorite-sports.component.html',
  styleUrl: './favorite-sports.component.scss'
})
export class FavoriteSportsComponent implements OnInit {

  title : string = "Choose your favorites"
  subTitle : string = "Select your favorite sports and leagues to get started."
  user: User

  sportClicked: boolean = false
  selectedChampionship = []
  sportsButtons = [
    {
      name: 'Football',
      disabled: false
    },
    {
      name: 'Basketball',
      disabled: true
    },
    {
      name: 'MMA/UFC',
      disabled: true
    },
    {
      name: 'Tennis',
      disabled: true
    },
    {
      name: 'Football US',
      disabled: true
    },
    {
      name: 'Cricket',
      disabled: true
    },
    {
      name: 'Rugby',
      disabled: true
    },
    {
      name: 'Boxe',
      disabled: true
    },
    {
      name: 'Handball',
      disabled: true
    },

  ]
  leaguesButtons = [
    {
      name: 'Ligue 1',
      disabled: false
    },
    {
      name: 'La liga',
      disabled: false
    },
    {
      name: 'champions league',
      disabled: false
    },
    {
      name: 'Serie A',
      disabled: false
    },
    {
      name: 'Premier League',
      disabled: false
    },


  ]

  constructor(private config: NgbCarouselConfig, private authService: AuthenticationService, private router : Router) {
    this.config.showNavigationArrows = false
  }

  ngOnInit(): void {
    this.user = this.authService.getUser()    
    this.selectedChampionship = this.user?.favoriteLeague.split(',') ?? []
  }

  selectLeagues(league) {
    const selected = this.selectedChampionship.findIndex(game => game === league?.name);
    if (selected === -1) {
      this.selectedChampionship.push(league?.name);
    }
    else {
      this.selectedChampionship.splice(selected, 1);
    }
    console.log(this.selectedChampionship);
  }

  isSelected(league) {    
      return this.selectedChampionship.findIndex(game => game === league?.name) !== -1;
    
  }


  submit() {
    let data = this.user
    data.favoriteSport = 'Football'    
    data.favoriteLeague = this.selectedChampionship.join(',')    
    if (this.selectedChampionship.length) {
      this.authService.updateUser(data).subscribe({
        next: res=>{
            localStorage.setItem('user',JSON.stringify(res.user))
            this.router.navigate(['/dashboard'])
  
        }
      })
    }
  }

}
