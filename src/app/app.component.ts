import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showDashboard : boolean =false;
 
  constructor(private router :Router,private platform :Platform) {
    this.showSplash();
    this.initialize();
    this.router.navigate(['/login']); // Replace 'home' with your desired route

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('dashboard')) {
          this.showDashboard= true
        }else{
          this.showDashboard = false
        }
      }
      
    });
  }


      private async showSplash(){
    await this.platform.ready();
    const lottie = (window as any).lottie;
    if (this.platform.is('ios') && lottie) {
    await lottie.splashscreen.hide();
    await lottie.splashscreen.show('public/assets/lottie/splash.json', false);
    setTimeout(() => {
      (window as any).lottie.splashscreen.hide();
    }, 3000);
    }
    }

  initialize(){
    GoogleAuth.initialize({
      clientId: '50674324828-sd97e6ahs20kbsb9jpgugfbmmlljksqe.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
  }
}
