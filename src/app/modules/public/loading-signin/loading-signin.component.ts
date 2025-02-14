import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { GoogleOAuthDto } from 'src/app/core/models/google-auth.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-signin',
  templateUrl: './loading-signin.component.html',
  styleUrls: ['./loading-signin.component.scss'],
})
export class LoadingSigninComponent {
  isSigningIn = false;

  constructor(private authService: AuthenticationService, private router: Router) {}

  googleSignin(googleWrapper: any) {
    this.authService.apple();
  }

  signIn() {
    SocialLogin.login({
      provider: 'google',
      options: {
        scopes: ['email', 'profile'],
      },
    })
      .then((res) => {
        if (res && res.result) {
          // Check if it's an online login response
          if (res.result.responseType === 'online' && res.result.profile) {
            let data: GoogleOAuthDto = {
              idToken: res.result.idToken,  // Use the idToken from the response
              email: res.result.profile.email,
              firstName: res.result.profile.givenName,
              lastName: res.result.profile.familyName,
              name: res.result.profile.name,
              photoUrl: res.result.profile.imageUrl,
              id: res.result.profile.id,
              provider: 'Google',
            };
            this.authService.login(data); // Call your login service with the response data
          } else {
            console.error('Google login failed: Response type is not "online".');
          }
        }
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  }
}