import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';
import { Championship } from '../models/championship.model';
import { HttpService } from '../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService  extends BaseService<Championship> {
  override entityName = 'championship';

  constructor(private HttpService : HttpService) {
    super();
  }
}
