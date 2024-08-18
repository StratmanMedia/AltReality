import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthConfig } from './auth-config';
import { User } from './user';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { constants } from '../../shared/classes/constants';
import { BattleNetProfile } from '../alt-reality-api/profile/models/battle-net-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authConfig: AuthConfig;
  private currentUser: BehaviorSubject<User>;
  private userDetails: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {

    this.authConfig = {
      clientId: environment.oauth2.client_id,
      redirectUri: environment.oauth2.redirect_uri,
      responseType: environment.oauth2.response_type,
      scope: environment.oauth2.scope,
      authorizationEndpoint: environment.oauth2.authorization_endpoint,
      tokenEndpoint: environment.oauth2.token_endpoint,
      userinfoEndpoint: environment.oauth2.userinfo_endpoint
    } as AuthConfig;
    this.currentUser = new BehaviorSubject<User>(null);
    const storageUser = localStorage.getItem(constants.storageKeys.currentUser);
    if (storageUser !== null) {
      this.currentUser = new BehaviorSubject<User>(JSON.parse(storageUser));
    }
  }

  signin(): void {
    localStorage.removeItem(constants.storageKeys.currentUser);
    localStorage.removeItem(constants.storageKeys.battleNetProfile);
    localStorage.setItem(constants.storageKeys.returnUrl, this.router.url);
    const authorizeUrl = `${this.authConfig.authorizationEndpoint}?client_id=${this.authConfig.clientId}&redirect_uri=${this.authConfig.redirectUri}&response_type=${this.authConfig.responseType}&scope=${this.authConfig.scope}`;
    window.location.href = authorizeUrl;
  }

  handleSigninCallback(): Observable<any> {
    return new Observable(subscriber => {
      const authCode = this.route.snapshot.queryParams['code'];
      const tokenBody = {
        clientId: this.authConfig.clientId,
        code: authCode,
        redirectUri: this.authConfig.redirectUri,
        scope: this.authConfig.scope
      };
      this.http.post(this.authConfig.tokenEndpoint, tokenBody).subscribe(
        (res: any) => {
          const accessToken = res.accessToken;
          this.http.get(`${environment.serviceUrl}/profile/me?accessToken=${accessToken}`).subscribe(
            (profile: BattleNetProfile) => {
              this.userDetails.battleNetProfile = profile;
              this.handleProfileAndUserInfoLoaded(subscriber);
              // localStorage.setItem(constants.storageKeys.battleNetProfile, JSON.stringify(profile));
            },
            (err) => {
              console.warn('Unable to retrieve the Battle.NET profile.');
              this.router.navigateByUrl('/');
            }
          );
          const headers = {
            'Authorization': `Bearer ${accessToken}`
          };
          this.http.get(this.authConfig.userinfoEndpoint, { headers }).subscribe(
            (user: any) => {
              const thisUser = {
                accessToken: accessToken,
                battleTag: user.battletag
              } as User;
              this.userDetails.userInfo = thisUser;
              this.handleProfileAndUserInfoLoaded(subscriber);
            });
        },
        (err) => {
          console.error('Unable to obtain an access token from Battle.NET');
          this.router.navigateByUrl('/');
        });
    });
  }

  getUser(): Observable<User> {
    return this.currentUser.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable(observer => {
      this.currentUser.subscribe(user => {
        observer.next(user !== null);
      });
    });
  }

  signout(): void {
    localStorage.removeItem(constants.storageKeys.currentUser);
    localStorage.removeItem(constants.storageKeys.battleNetProfile);
    window.location.href = environment.baseUrl;
  }

  private handleProfileAndUserInfoLoaded(subscriber: Observer<User>): void {
    if (this.userDetails.battleNetProfile && this.userDetails.userInfo) {
      localStorage.setItem(constants.storageKeys.currentUser, JSON.stringify(this.userDetails.userInfo));
      this.currentUser.next(this.userDetails.userInfo);
      subscriber.next(this.userDetails.userInfo);
    }
  }
}
