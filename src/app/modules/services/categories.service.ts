import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';
import { HttpService } from '../../core/services/http.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService  extends BaseService<Category> {
  override entityName = 'categories';

  constructor(private HttpService : HttpService) {
    super();
  }
}
