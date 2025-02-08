import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  #http: HttpClient = inject(HttpClient);

  constructor() {
  }

  removeTrailingSlash(str: string) {
    return str.replace(/\/+$/, '');
  }

  getAll<T>(path: string): Observable<T> {
    return this.#http.get<T>(apiUrl + '/' + this.removeTrailingSlash(path));
  }

  get<T>(path: string) {
    return this.#http.get<T>(apiUrl + '/' + this.removeTrailingSlash(path));
  }

  getOne<T>(path: string, id: any): Observable<T> {
    return this.#http.get<T>(apiUrl + '/' + this.removeTrailingSlash(path) + '/' + id);
  }

  delete<T>(path: string, id: number): Observable<T> {
    return this.#http.delete<T>(apiUrl + '/' + this.removeTrailingSlash(path) + '/' + id);
  }

  deleteWithTwoParams<T>(path: string) {
    return this.#http.delete<T>(apiUrl + '/' + this.removeTrailingSlash(path));
  }

  create<T, C>(path: string, data: C): Observable<T> {
    return this.#http.post<T>(apiUrl + '/' + this.removeTrailingSlash(path), data);
  }

  createFormData<T>(path: string, data: FormData): Observable<T> {
    return this.#http.post<T>(apiUrl + '/' + this.removeTrailingSlash(path) + '', data);
  }

  bulkCreate<T, C>(path: string, data: C): Observable<T> {
    return this.#http.post<T>(apiUrl + '/' + this.removeTrailingSlash(path) + '/bulkcreate', data);
  }

  post<T, C>(path: string, data: C): Observable<T> {
    return this.#http.post<T>(apiUrl + '/' + this.removeTrailingSlash(path), data);
  }

  update<T, C>(path: string, data: C): Observable<T> {
    return this.#http.patch<T>(apiUrl + '/' + this.removeTrailingSlash(path), data);
  }

  updateFormData<T>(path: string, id: number, data: FormData): Observable<T> {
    return this.#http.patch<T>(apiUrl + '/' + this.removeTrailingSlash(path) + '/update/' + id, data);
  }

  patch<T, C>(path: string, data: C): Observable<T> {
    return this.#http.patch<T>(apiUrl + '/' + this.removeTrailingSlash(path), data);
  }
  
  put<T, C>(path: string, data: C): Observable<T> {
    return this.#http.put<T>(apiUrl + '/' + this.removeTrailingSlash(path), data);
  }

  bulkUpdate<T, C>(path: string, data: C): Observable<T> {
    return this.#http.patch<T>(apiUrl + '/' + this.removeTrailingSlash(path) + '/', data);
  }

}

