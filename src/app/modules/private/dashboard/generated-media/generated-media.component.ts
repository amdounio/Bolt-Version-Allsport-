import { Component, OnInit } from '@angular/core';
import { Background } from 'src/app/modules/models/background.model';
import { GeneratedPhoto } from 'src/app/modules/models/generated-photo.model';
import { Match } from 'src/app/modules/models/match.model';
import { Typography } from 'src/app/modules/models/typography.model';
import { BackgroundsComponent } from '../backgrounds/backgrounds.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatchService } from 'src/app/modules/services/match.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { GoogleOAuthDto } from 'src/app/core/models/google-auth.dto';

@Component({
  selector: 'app-generated-media',
  templateUrl: './generated-media.component.html',
  styleUrls: ['./generated-media.component.scss'],
})
export class GeneratedMediaComponent implements OnInit {
  title: string = ''
  subTitle: string = 'custom your posters'
  firstDayMatchs: Match[] = []
  secondDayMatchs: Match[] = []
  selectedMatch: Match[] = []
  selectedBackground: Background
  startDate: Date;
  endDate: Date;
  startDateString: string;
  endDateString: string;
  leagueName: string = "";
  user: GoogleOAuthDto
  generatedMedia: GeneratedPhoto[] = []
  startGenerate: boolean = false;

  typographyList: Typography[] = [
    { id: 1, name: 'Tahoma', key : 'font-Tahoma' },
    { id: 2, name: 'Arial', key : 'font-Arial' },
    { id: 3, name: 'Helvetica' , key : 'font-Helvetica'},
    { id: 4, name: 'Times New Roman', key : 'font-Times New Roman' },
    { id: 5, name: 'Courier New', key : 'font-Courier New' },
    { id: 6, name: 'Verdana' , key : 'font-Verdana'},
    { id: 7, name: 'Georgia', key : 'font-Georgia' },
    { id: 8, name: 'Palatino' , key : 'font-Palatino'},
    { id: 9, name: 'Garamond', key : 'font-Garamond' },
    { id: 10, name: 'Bookman', key : 'font-Bookman' }
  ];

  selectedTypography: Typography
  constructor(private modalService: NgbModal, private matchService: MatchService, private router: Router, private activateRoute: ActivatedRoute, private authService: AuthenticationService, private notificationService : NotificationService) { }

  ngOnInit() {
    this.user = this.authService.getUser()
    this.leagueName = localStorage.getItem('leagueName');
    this.generate()

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
        this.generate()
      }
    })
  }
  selectTypography(item: Typography) {
    this.selectedTypography = item
    this.generate()
  }

  isTypographyChecked(item) {
    return this.selectedTypography === item
  }


  generate() {
    this.selectedMatch = JSON.parse(localStorage.getItem('selectedMatchs'));
    this.startGenerate = true
    this.generatedMedia = [];

    const mediaRequests = this.selectedMatch.map(match => {
      match.background = this.selectedBackground?.image || ""
      match.typography = this.selectedTypography?.key || ""
      const data = {
        userId : this.user.id,
        match: match,
        typography: this.selectedTypography,
        background: this.selectedBackground
      };

      return this.matchService.generateMedia(data).toPromise()
        .then(res => {
          this.generatedMedia.push(res);
        })
        .catch(error => {
          this.notificationService.Error(error?.error?.message)
          console.error(error);
        });
    });

    Promise.all(mediaRequests).then(() => {
      this.startGenerate = false;
      console.log('All media generated successfully');
    });
  }


  saveMedia() {
    this.matchService.saveGeneratedMedia(this.generatedMedia, this.authService.getUser().id).subscribe({
      next: res => {
        localStorage.removeItem('selectedMatchs')
        this.router.navigate(['/dashboard/media']);
      },
      error: error => {
        console.log(error);

      }
    })
  }
}
