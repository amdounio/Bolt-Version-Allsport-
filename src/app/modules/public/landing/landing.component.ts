import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {GoogleAuth, User} from '@codetrix-studio/capacitor-google-auth';
import { GoogleOAuthDto } from 'src/app/core/models/google-auth.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {

  constructor(private authService : AuthenticationService,private router : Router) {}

   



  googleSignin(googleWrapper: any) {
    this.authService.apple()
  }

  

  signIn(){
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
}
}
