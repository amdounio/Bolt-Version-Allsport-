import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';
import { HttpService } from '../../core/services/http.service';
import { Background } from '../models/background.model';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService extends BaseService<Background> {
  override entityName = 'templates';

  constructor(private HttpService : HttpService) {
    super();
  }


  getBackgroundByCategories(ids: number[]){
    return this.HttpService.post(this.entityName+'/categories',{categoryIds : ids })
  }
}
