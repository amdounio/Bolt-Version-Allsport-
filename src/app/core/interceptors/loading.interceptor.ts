import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;
  private loadingElement: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) {}

  async showLoading() {
    if (!this.loadingElement) {
      this.loadingElement = await this.loadingController.create({
        spinner: 'bubbles',
      });
      await this.loadingElement.present();
    }
  }

  async hideLoading() {
    if (this.loadingElement) {
      await this.loadingElement.dismiss();
      this.loadingElement = null;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiPath = req.url.replace('https://srv620695.hstgr.cloud/', '');

    // Check if the path matches the excluded pattern
    const excludedPathPattern = /^api\/matches\/leagues\/\d+\/matches$/; // Matches 'api/matches/leagues/{number}/matches'
    const shouldSkipLoading = excludedPathPattern.test(apiPath);

    if (!shouldSkipLoading) {
      if (this.activeRequests === 0) {
        this.showLoading();
      }
      this.activeRequests++;
    }

    

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.hideLoading();
        }
      })
    );
  }
}
