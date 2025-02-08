import { Component, OnInit } from '@angular/core';
import { GeneratedPhoto } from '../../../models/generated-photo.model';
import { MatchService } from '../../../services/match.service';
import { MediaDTO } from '../../../models/media.model.dto';
import { Match } from 'src/app/modules/models/match.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent implements OnInit {
  title : string = 'medias'
  subTitle : string = 'telecharge ton contenu'
  mediaList: MediaDTO[] = []

  constructor(private matchService: MatchService, private authService : AuthenticationService) { }

  ngOnInit(): void {
    this.loadData()


  }

  loadData() {
    let userId = Number(this.authService.getUser().id);
    
    this.matchService.getGeneratedMedia(userId).subscribe({
      next: res => {
        this.mediaList = res        
      },
      error: error => {
        console.log(error);
      }
    })

    console.log(this.mediaList);


    
  }


  formtDate(inputDate: string) {
    const date = new Date(inputDate)
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' }; const locale = 'fr-FR'; // French locale for "Vendredi", "Aout"
    const dateFormatter = new Intl.DateTimeFormat(locale, options);
    const [weekDay, dayOfMonth, month] = dateFormatter.format(date).split(' ');
    const dayOfWeek = weekDay.charAt(0).toUpperCase() + weekDay.slice(1); // Capitalize first letter 
    const day = dayOfMonth;
    const months = month.charAt(0).toUpperCase() + month.slice(1);
    return { dayWeek: dayOfWeek, day: day, month: months }
  }

  download(fileUrl,media : Match): void {
    let match = 'all_sports_'+media.firstTeam.name+'_vs_'+ media.secondTeam.name+'.png'
    this.matchService.downloadFile(fileUrl,match);
  }

  delete(id:number, userId : number, media: number){
    let data = {
      userId: userId,
      mediathequeId:media
  }
    this.matchService.deleteMedia(id,data).subscribe({
      next : res=>{
        this.loadData()
        
      },
      error : error=>{
        console.log(error);
        
      }
    })
  }
}
