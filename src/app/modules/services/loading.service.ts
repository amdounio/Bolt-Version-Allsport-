import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) {}

  async show(message: string = 'Loading...'): Promise<void> {
    if (!this.loading) {
      this.loading = await this.loadingController.create({
        spinner: 'bubbles' 
      });
      await this.loading.present();
    }
  }

  async hide(): Promise<void> {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
