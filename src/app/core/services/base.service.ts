import {inject} from "@angular/core";
import {Observable} from "rxjs";
import { HttpService } from "./http.service";


export abstract class BaseService<T> {

  #httpService: HttpService = inject(HttpService);

  protected entityName = "";

  protected constructor() {
    this.entityName = this.constructor.name.charAt(0).toLocaleLowerCase() + this.constructor.name.slice(1);
    this.entityName = this.entityName
      .replace('Service', '')
      .replace(/([A-Z])/g, '-$1')
      .toLocaleLowerCase();
  }


  createWithResponse(entity: T): Observable<T> {
    return this.#httpService.create<T, T>(this.entityName, entity)
  }

  updateWithResponse(data: T): Observable<T> {
    return this.#httpService.update<T, T>(this.entityName, data);
  }

  getOneObservable(id: any): Observable<T> {
    return this.#httpService.getOne<T>(this.entityName, id);
  }

  getAll(){
    return this.#httpService.getAll<T[]>(this.entityName)
  }

  delete(id: any) {
    return this.#httpService.delete(this.entityName, id);
  }

}
