import { Component } from '@angular/core';
import { Match } from '../../../models/match.model';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Splide from '@splidejs/splide';
import { BackgroundsComponent } from '../backgrounds/backgrounds.component';
import { Typography } from '../../../models/typography.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../../../services/match.service';
import { Background } from '../../../models/background.model';
import { GeneratedPhoto } from '../../../models/generated-photo.model';


@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrl: './matchs.component.scss'
})
export class MatchsComponent {
  subTitle : string = 'select your matches'
  firstDayMatchs: Match[] = []
  secondDayMatchs: Match[] = []
  selectedMatch: Match[] = []
  selectedBackground: Background
  startDate: Date;
  endDate: Date;
  startDateString: string;
  endDateString: string;
  leagueName: string = "";

  generatedMedia: GeneratedPhoto[] = []
  startLoading: boolean = false;

 
  selectedTypography: Typography

  constructor(private config: NgbCarouselConfig, private modalService: NgbModal, private activeRoute: ActivatedRoute, private matchService: MatchService, private router: Router) {
    this.config.showNavigationArrows = true;
    this.config.showNavigationIndicators = true;
    this.startDate = new Date();
    this.startDateString = this.formatDate(this.startDate);
  }

  ngOnInit(): void {
    this.getData();
  }


  openBackgroundModal() {
    const backgroundModalRef = this.modalService.open(BackgroundsComponent, {
      fullscreen: true,
      centered: true
    })
    backgroundModalRef.closed.subscribe({
      next: res => {
        console.log(res);
        this.selectedBackground = res.selectedBackground
      }
    })
  }


  getData() {
    this.startLoading = true;
    this.firstDayMatchs = []
    this.leagueName = this.activeRoute.snapshot.queryParamMap.get('name');
    let leagueId = this.activeRoute.snapshot.queryParamMap.get('id');
    let season = this.startDate.getFullYear().toString()
    const firstDay = { leagueId: leagueId, date: this.startDate, season: season }
    this.matchService.getMatch(firstDay).subscribe({
      next: res => {
        this.firstDayMatchs = res;
        this.startLoading = false
      },
      error: error => {
        console.log(error);
        this.startLoading = false
      }
    })

  }

  next() {
    this.startDate.setDate(this.startDate.getDate() + 1); // Increment startDate by one day 
    this.startDateString = this.formatDate(this.startDate);
    this.getData();
  }

  previous() {
    this.startDate.setDate(this.startDate.getDate() - 1); // Decrement startDate by one day 
    this.startDateString = this.formatDate(this.startDate);
    this.getData();
  }


  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('fr-FR', options);
  }

  selectMatch(selectedItem: Match) {
    const findMatchIndex = this.selectedMatch.findIndex(match => match.id === selectedItem.id);

    if (findMatchIndex !== -1) {
      this.selectedMatch.splice(findMatchIndex, 1);
    } else {
      this.selectedMatch.push(selectedItem);
    }

    localStorage.setItem('selectedMatchs',JSON.stringify(this.selectedMatch))
    localStorage.setItem('leagueName',this.leagueName)

  }







}