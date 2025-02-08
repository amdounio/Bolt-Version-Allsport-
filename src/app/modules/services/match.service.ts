import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';
import { HttpService } from '../../core/services/http.service';
import { Match } from '../models/match.model';
import { MatchRequestDTO } from '../models/matchRequest.dto';
import { GeneratedPhoto } from '../models/generated-photo.model';
import { GeneratedPhotoDTO } from '../models/generate-photo.dto';
import { MediaDTO } from '../models/media.model.dto';
import { HttpClient } from '@angular/common/http';
import { FilesystemDirectory,Filesystem, Directory, DownloadFileResult,FilesystemEncoding,Encoding } from '@capacitor/filesystem';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Platform } from '@ionic/angular';

import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { LoadingController } from '@ionic/angular'; // Import for loading indicator



@Injectable({
  providedIn: 'root'
})
export class MatchService extends BaseService<Match> {
  override entityName = 'match';

  constructor(
    private HttpService: HttpService,
    private notificationService: NotificationService,
    private loadingController: LoadingController // Inject LoadingController
  ) {
    super();
  }

  getMatch(data: MatchRequestDTO) {
    return this.HttpService.post<Match[], MatchRequestDTO>(`matches/leagues/${data.leagueId}/matches`, data)
  }


  generateMedia(match: GeneratedPhotoDTO) {
    return this.HttpService.post<GeneratedPhoto, GeneratedPhotoDTO>('generator/generate-image/combined', match)
  }

  saveGeneratedMedia(data: GeneratedPhoto[], userId) {
    return this.HttpService.post('generator/save', { matches: data, userId: userId })
  }

  getGeneratedMedia(userId: number) {
    return this.HttpService.get<MediaDTO[]>('mediatheques/matches/' + userId)
  }



  async downloadFile(fileUrl: string, fileName: string): Promise<void> {

      try {
        const loading = await this.loadingController.create({
          spinner: 'bubbles' // Customize spinner style as desired
        });
        await loading.present();

        const urlSegments = fileUrl.split('/');
        const extractedFileName = fileName || urlSegments[urlSegments.length - 1];
        console.log(extractedFileName);
  
        const { path } = await Filesystem.downloadFile({
          path: extractedFileName,
          url: fileUrl,
          directory: Directory.Data,
        });
  
        await loading.dismiss(); // Dismiss loading indicator on success
  
        await Share.share({
          files: [path],
        });
  
        this.notificationService.Success('File Shared successfully!');


      }
     catch (error) {
      console.error('Download failed', error);
      this.notificationService.Error('Failed to download file.');
    }
  }
  
  deleteMedia(id: number, data) {
    return this.HttpService.post('mediatheques/matches/' + id, data);
  }


}
