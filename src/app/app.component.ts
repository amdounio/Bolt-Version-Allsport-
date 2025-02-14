import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { AuthenticationService } from './core/services/authentication.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  showDashboard = false;
 
  constructor(
    private router: Router,
    private platform: Platform,
    private authService: AuthenticationService
  ) {}

  async ngOnInit() {
    await this.showCustomSplashScreen();
    await this.platform.ready();
    await this.initializeApp();
    this.setupRouting();
  }

  private async initializeApp() {
   // await this.showSplash();

    await this.initializeGoogleAuth();
    
    // Check authentication state
    if (this.authService.isAuthenticated()) {
      const currentUrl = this.router.url;

      console.log("initializeApp")
      console.log(currentUrl)

      // Allow access to user description page even when authenticated
      if (currentUrl !== '/register/user-description') {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.router.navigate(['/login']);
    }
    
    // Subscribe to auth state changes
    this.authService.isAuthenticated$.pipe(
      filter(isAuthenticated => !isAuthenticated)
    ).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  private setupRouting() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showDashboard = event.url.includes('dashboard');
      }
    });
  }


  private showCustomSplashScreen() {
    const splash = document.createElement('div');
    splash.id = 'custom-splash';
    splash.style.position = 'absolute';
    splash.style.top = '0';
    splash.style.left = '0';
    splash.style.width = '100%';
    splash.style.height = '100%';
    splash.style.backgroundColor = '#ffffff'; // Set background color
    splash.style.zIndex = '9999';
    splash.innerHTML = `
      <img src="assets/gifs/spalsh.gif" style="width: 100%; height: 100%; object-fit: cover;" />
    `;
    document.body.appendChild(splash);

    // Hide the custom splash after 3 seconds
    setTimeout(() => {
      splash.remove();
    }, 3000);
  }


  /*

  private async showSplash() {
    const lottie = (window as any).lottie;
    if (this.platform.is('ios') && lottie) {
      await lottie.splashscreen.hide();
      await lottie.splashscreen.show('public/assets/lottie/splash.json', false);
      setTimeout(() => {
        (window as any).lottie.splashscreen.hide();
      }, 3000);
    }
  }
*/
  private async initializeGoogleAuth() {
    try {
      // Initialize the Social Login with Google provider
      await SocialLogin.initialize({
        google: {
          iOSClientId: '50674324828-sd97e6ahs20kbsb9jpgugfbmmlljksqe.apps.googleusercontent.com', // Replace with your actual iOS client ID
          iOSServerClientId: '50674324828-sd97e6ahs20kbsb9jpgugfbmmlljksqe.apps.googleusercontent.com', // Replace with your actual iOS server client ID if needed
        },
      });
      console.log('Google Authentication initialized successfully');
    } catch (error) {
      console.error('Error initializing Google Authentication:', error);
    }
  }
  
}