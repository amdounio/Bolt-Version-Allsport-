import { Injectable } from '@angular/core';
import { Sport } from '../models/sports.model';
import { BaseService } from '../../core/services/base.service';
import { HttpService } from '../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class SportService  extends BaseService<Sport> {
  override entityName = 'sport';

  constructor(private HttpService : HttpService) {
    super();
  }
}
