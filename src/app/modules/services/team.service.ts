import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { BaseService } from '../../core/services/base.service';
import { HttpService } from '../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService  extends BaseService<Team> {
  override entityName = 'team';

  constructor(private HttpService : HttpService) {
    super();
  }
}
