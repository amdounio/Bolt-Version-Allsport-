import { Injectable } from '@angular/core';
import { Typography } from '../models/typography.model';
import { BaseService } from '../../core/services/base.service';
import { HttpService } from '../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class TypographyService  extends BaseService<Typography> {
  override entityName = 'background';

  constructor(private HttpService : HttpService) {
    super();
  }
}
