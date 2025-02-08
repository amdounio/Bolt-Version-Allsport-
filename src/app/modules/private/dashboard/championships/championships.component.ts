import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Championship } from 'src/app/modules/models/championship.model';
import { ChampionshipService } from 'src/app/modules/services/championship.service';

@Component({
  selector: 'app-championships',
  templateUrl: './championships.component.html',
  styleUrls: ['./championships.component.scss'],
})
export class ChampionshipsComponent implements OnInit  {
  title : string = 'competitions';
  subTitle : string = 'choose your competition';
  isSportItemSelected: boolean = false
  championshipList: Championship[] = []


  constructor(private router: Router,private activateRoute : ActivatedRoute, private championshipService: ChampionshipService) { }
  
  ngOnInit(): void {
    this.selectSport()
  }

  selectSport() {
    const id = this.activateRoute.snapshot.queryParamMap.get('id');
    this.championshipService.getChampionshipBySport().subscribe({
      next: res => {
        this.isSportItemSelected = true;
        this.championshipList = res

      },
      error: error => {
        console.log(error);

      }
    })

  }


  selectChampions(data: Championship) {
    this.router.navigate(['dashboard/matchs'], { queryParams: { id: data.id, name: data.title } })
  }
}
