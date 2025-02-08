import { SocialAuthService } from '@abacritt/angularx-social-login';
import { inject, Injectable } from '@angular/core';
import { GoogleOAuthDto } from '../models/google-auth.dto';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { Login } from '../../models/login.model';
import { AuthenticationResponse } from '../../models/auth-response.dto';
import { User } from '../../models/user.model';
import { Role } from '../enums/role.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { NavController } from '@ionic/angular';
import { SignInWithApple, SignInWithAppleResponse, SignInWithAppleOptions } from '@capacitor-community/apple-sign-in';


declare var AppleID: any;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  tokenExpirationTimer
  $isAuthenticated = new BehaviorSubject<boolean>(false);
  token: string = ''

 

  constructor(private router: Router, private notificationService: NotificationService, private httpService: HttpService, private navCtrl: NavController) {
  }

  login(data: any) {
    this.httpService.post<AuthenticationResponse, GoogleOAuthDto>('auth/login', data).subscribe({
      next: res => {
        this.saveCredentials(res);
        const tokenExpiration = this.getTokenExpiration(res.idToken ? res.idToken : res.token);
        this.setLogoutTimer(tokenExpiration);

        if (res.newUser) {
          this.router.navigate(['/register/user-description'], { replaceUrl: true });
        }else{
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        }

        this.$isAuthenticated.next(true)


      },
      error: error => {
        console.error(error);
        this.notificationService.Error('ERROR WHILE login')
      }
    })
  }


  register(data: GoogleOAuthDto) {
    this.httpService.post<AuthenticationResponse, GoogleOAuthDto>('auth/register', data).subscribe({
      next: res => {
        this.saveCredentials(res);
        if (!res.newUser) {
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        } else {
          this.router.navigate(['/register/user-description'], { replaceUrl: true });
        }
      },
      error: error => {
        console.error(error);
        this.notificationService.Error('ERROR WHILE login')
      }
    })
  }


  updateUser(data: User) {
    return this.httpService.put<{ user: User }, User>('edit-info/', data);
  }

  getOneObservable(id: any): Observable<User> {
    return this.httpService.getOne<User>('user', id);
  }

  private saveCredentials(authenticationResponse: AuthenticationResponse) {
    localStorage.setItem('user', JSON.stringify(authenticationResponse.user));
    localStorage.setItem('token', authenticationResponse.idToken);
  }

  uploadUserProfil(data : FormData){
    return this.httpService.createFormData<{user : User}>('users/upload-photo',data)
  }

  // updateUserCredentials(user: User) {
  //   localStorage.setItem('user', JSON.stringify(user));
  // }

  redirectToHomePage() {
    this.router.navigate(['/'], { replaceUrl: true });
    return false;
  }

  redirectToResetPasswordPage() {
    this.router.navigate(['/reset-password'], { replaceUrl: true });
    return false;
  }

  async logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot('/', { replaceUrl: true });
    window.location.href = window.location.origin
    await GoogleAuth.signOut()
    // return false;
  }

  getUser(): User | null {
    return JSON.parse(localStorage.getItem('user'));
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token')
  }

  isAuthenticated(): boolean {
    return this.getUser() !== null && this.getAccessToken() !== null;
  }



  isADMIN(): boolean {
    const user = this.getUser();
    if (user === undefined || user?.role === undefined) {
      return false;
    }
    return user?.role === Role.ADMIN
  }

  isUser(): boolean {
    const user = this.getUser();
    if (user === undefined || user?.role === undefined) {
      return false;
    }
    return user?.role === Role.USER
  }


  socialAuthInit() {
    GoogleAuth.signIn().then((res) => {
      if (res) {
        console.log(res);
        let data: GoogleOAuthDto = {
          idToken: res.authentication.idToken,
          email: res.email,
          firstName: res.givenName,
          lastName: res.familyName,
          name: res.name,
          photoUrl: res.imageUrl,
          id: res.id,
          provider: 'Google'
        }
        this.login(data)
      }
    });
    // this.socialAuthService.authState.subscribe({
    //   next: (user: GoogleOAuthDto) => {
    //     if (user) {
    //       this.login(user)
    //     }
    //   },
    //   error: error => {
    //     this.notificationService.Error("something went wrong")
    //   }
    // });
  }


  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  public async apple() {
    const options: SignInWithAppleOptions = {
      clientId: 'com.2points.allsports',
      redirectURI: 'https://allsports-beta.2points.fr/api/auth/login',
      scopes: 'email name',
      state: '12345',
      nonce: 'nonce',
    };
    SignInWithApple.authorize(options).then((result: SignInWithAppleResponse) => {
      console.log("logged in");
      
      // Handle user information // Validate token with server and create new session 
    }).catch(error => { // Handle error
      console.log(error);
      
    });
  }



  private getTokenExpiration(token: string): number {
    const decodedToken: any = jwtDecode(token); // Decode JWT token
    if (decodedToken.exp === undefined) return null;
    const expirationDate = new Date(0); // Unix epoch
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate.getTime();
  }

  private setLogoutTimer(expirationTime: number): void {
    const expirationDuration = expirationTime - Date.now();
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  isTokenExpired() {
    if (this.getAccessToken()) {
      const decodedToken = jwtDecode(this.getAccessToken());
      const dateNow = new Date();
      // exp is in seconds, convert it to milliseconds
      if (decodedToken.exp < dateNow.getTime() / 1000) {
        this.logout();  // Call your logout function
      } else {
        this.$isAuthenticated.next(true)
      }
    } else {
      this.logout()
    }

  }


  planSubscription(plan) {
    return this.httpService.post<{ url: string }, { userId: string }>('subscriptions/subscribe/' + plan, { userId: this.getUser().id })
  }


}
