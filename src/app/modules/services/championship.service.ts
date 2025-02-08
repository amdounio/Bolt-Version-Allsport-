import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { Championship } from '../models/championship.model';
import { BaseService } from '../../core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService  extends BaseService<Championship> {
  override entityName = 'background';

  constructor(private HttpService : HttpService) {
    super();
  }
  

  getChampionshipBySport(){
    return this.HttpService.get<Championship[]>('matches/leagues')
  }
}
