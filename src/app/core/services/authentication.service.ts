import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpService } from './http.service';
import { User } from '../../models/user.model';
import { NotificationService } from '../../shared/services/notification.service';
import { GoogleOAuthDto } from '../models/google-auth.dto';
import { AuthenticationResponse } from '../../models/auth-response.dto';
import { jwtDecode } from 'jwt-decode';
import { SocialLogin } from '@capgo/capacitor-social-login';

import { SignInWithApple } from '@capacitor-community/apple-sign-in';
import shajs from 'sha.js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenExpirationTimer: any;
  private readonly $isAuthenticated = new BehaviorSubject<boolean>(false);
  private readonly $user = new BehaviorSubject<User | null>(null);
  
  readonly isAuthenticated$ = this.$isAuthenticated.asObservable();
  readonly user$ = this.$user.asObservable();

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private httpService: HttpService
  ) {
    this.checkAuthState();
  }

  private checkAuthState() {
    const token = this.getAccessToken();
    const user = this.getUser();
    if (token && user) {
      this.$isAuthenticated.next(true);
      this.$user.next(user);
      this.setupAutoLogout(token);
    }
  }

  login(data: GoogleOAuthDto) {
    this.httpService.post<AuthenticationResponse, GoogleOAuthDto>('auth/login', data).subscribe({
      next: res => {
        this.handleAuthResponse(res, data.rememberMe);
        console.log(res.newUser)
        if (res.newUser) {
          this.router.navigate(['/register/user-description'], { replaceUrl: true });
        } else {
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        }
      },
      error: error => {
        console.error(error);
        this.notificationService.Error('Login failed');
      }
    });
  }

  private handleAuthResponse(response: AuthenticationResponse, rememberMe: boolean = false) {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.clear(); // Clears all keys in the storage
    localStorage.clear();
    sessionStorage.clear();
    storage.setItem('user', JSON.stringify(response.user));
    storage.setItem('token', response.idToken || response.token);

    this.$isAuthenticated.next(true);
    this.$user.next(response.user);
    this.setupAutoLogout(response.idToken || response.token);
  }

  private setupAutoLogout(token: string) {
    const expirationTime = this.getTokenExpiration(token);
    if (expirationTime) {
      const timeUntilExpiry = expirationTime - Date.now();
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, timeUntilExpiry);
    }
  }

  async logout() {
    try {
      localStorage.clear();
      sessionStorage.clear();
      
      this.$isAuthenticated.next(false);
      this.$user.next(null);
      
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
      }
      
      try {
        await SocialLogin.logout({
          provider: "google"  // 'google', 'apple', or 'facebook'
        });
       
      } catch (error) {
        console.log('Google sign out error:', error);
      }


      try {
       
        await SocialLogin.logout({
          provider: "apple"  // 'google', 'apple', or 'facebook'
        });
      } catch (error) {
        console.log('Google sign out error:', error);
      }

      this.router.navigate(['/login'], { 
        replaceUrl: true,
        queryParams: { logout: 'success' }
      }).then(() => {
        window.location.reload();
      });

      this.notificationService.Success('Logged out successfully');
      
    } catch (error) {
      console.error('Logout error:', error);
      this.notificationService.Error('Error during logout');
    }
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.$isAuthenticated.value;
  }

  updateUser(data: User): Observable<{ user: User }> {
    const currentUser = this.getUser();
    const updatedData = { 
      ...currentUser, 
      ...data,
      id: currentUser?.id ,
      firstName:currentUser?.name
    };

    return this.httpService.put<{ user: User }, User>('edit-info/', updatedData).pipe(
      tap(response => {
        if (response.user) {
          const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
          storage.setItem('user', JSON.stringify(response.user));
          this.$user.next(response.user);
        }
      })
    );
  }

  uploadUserProfil(formData: FormData): Observable<{ user: User }> {
    return this.httpService.createFormData<{ user: User }>('users/upload-photo', formData).pipe(
      tap(response => {
        if (response.user) {
          const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
          storage.setItem('user', JSON.stringify(response.user));
          this.$user.next(response.user);
        }
      })
    );
  }

  getOneObservable(id: string): Observable<User> {
    return this.httpService.getOne<User>('user', id);
  }

  planSubscription(plan: string): Observable<{ url: string }> {
    const user = this.getUser();
    if (!user) {
      throw new Error('No user found');
    }
    return this.httpService.post<{ url: string }, { userId: string }>(
      `subscriptions/subscribe/${plan}`, 
      { userId: user.id }
    );
  }

  isSigningIn = false;
  async apple() {
    this.isSigningIn = true;
  
    try {
      // Generate a nonce for security purposes
      const rawNonce = 'any random string will do here'; // You can use a more secure random string generation method
      const nonce = shajs('sha256').update(rawNonce).digest('hex');
  
      // Initialize SocialLogin with the Apple provider and relevant configuration
      await SocialLogin.initialize({
        apple: {
          clientId: 'connect.com.2points.allsports'
        },
      });
  
      // Perform Apple login with the required scopes
      const response = await SocialLogin.login({
        provider: 'apple',
        options: {
          scopes: ['email', 'name'],
          nonce, // Include nonce for security
        },
      });
  
      // Handle successful login
      console.log('Apple sign-in successful:', response);
  
      // Check if the response contains the expected data
      if (response && response.result) {
        if (response.result.profile) {
          // Extract user information
          const data: GoogleOAuthDto = {
            idToken: response.result.idToken, // Use Apple's idToken
            email: response.result.profile.email,
            firstName: response.result.profile.givenName || '', // If no given name, set an empty string
            lastName: response.result.profile.familyName || '', // If no family name, set an empty string
            name: response.result.profile.user, // Use user ID as a fallback for the name
            photoUrl: '', // Apple doesn't provide a photo URL, but you could consider adding a default image
            id: response.result.profile.user, // Use the user ID as a unique identifier
            provider: 'Apple', // Apple provider
          };
  
          // Call your login service with the Apple login data
          this.login(data); 
        } else {
          console.error('Apple login failed: Missing profile data.');
        }
      } else {
        console.error('Apple login failed: Invalid response.');
      }
    } catch (error) {
      // Handle error cases
      console.error('Apple sign-in failed:', error);
      if (error.error === 'user_trigger_new_signin_flow') {
        this.notificationService.Error('Please complete the previous sign-in attempt before starting a new one.');
      } else if (error.error === 'canceled') {
        this.notificationService.Error('Apple sign-in was canceled.');
      } else {
        this.notificationService.Error('Apple sign-in failed. Please try again later.');
      }
    } finally {
      this.isSigningIn = false;
    }
  }

  private getTokenExpiration(token: string): number | null {
    try {
      const decodedToken: any = jwtDecode(token);
      if (!decodedToken.exp) return null;
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      return expirationDate.getTime();
    } catch {
      return null;
    }
  }
}