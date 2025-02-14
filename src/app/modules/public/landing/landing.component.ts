import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { GoogleOAuthDto } from 'src/app/core/models/google-auth.dto';
import { Router } from '@angular/router';
import { SocialLogin } from '@capgo/capacitor-social-login';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  isSigningIn = false;

  constructor(private authService : AuthenticationService,private router : Router) {}

   



  googleSignin(googleWrapper: any) {
    this.authService.apple()
  }

  

  /*signIn(){
    GoogleAuth.signIn().then((res)=>{
      if (res) {
        let data : GoogleOAuthDto= {
          idToken : res.authentication.idToken,
          email : res.email,
          firstName : res.givenName,
          lastName : res.familyName,
          name : res.name,
          photoUrl : res.imageUrl,
          id : res.id,
          provider : 'Google'
        }
        this.authService.login(data)
      }
  }).catch(error=>{
    console.log(error);
    
  })
}*/


signIn() {
  SocialLogin.login({
    provider: 'google',
    options: {
      scopes: ['email', 'profile'],
    },
  })
    .then((res) => {
      if (res && res.result) {
        // Handle the online response
        if (res.result.responseType === 'online' && res.result.profile) {
          let data: GoogleOAuthDto = {
            idToken: res.result.idToken, // Extract the idToken from online response
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
          console.error('Google login failed: responseType is not "online".');
        }
      }
    })
    .catch((error) => {
      console.error('Google sign-in error:', error);
    });
}


}
