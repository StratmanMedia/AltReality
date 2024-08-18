import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CharacterModel } from './character/models/character-model';
import { BattleNetTokenModel } from './api-auth/models/battle-net-token-model';
import { TokenRequestModel } from './api-auth/models/token-request-model';
import { constants } from 'src/app/shared/classes/constants';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user';
import { TeamModel } from './team/models/team-model';
import { RequestCacheService } from '../caching/request-cache.service';
import { BattleNetProfile } from './profile/models/battle-net-profile';

@Injectable({
  providedIn: 'root'
})
export class AltRealityApiService {

  accessToken: string;
  auth: ApiAuthService;
  character: ApiCharacterService;
  profile: ApiProfileService;
  team: ApiTeamService;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cache: RequestCacheService) {

      this.authService.getUser().subscribe(
        (user: User) => {
          this.accessToken = user.accessToken;
          this.profile = new ApiProfileService(this.http, this.authService, this.accessToken);
        });
      this.auth = new ApiAuthService(this.http);
      this.character = new ApiCharacterService(this.http, this.authService);
      this.team = new ApiTeamService(this.http, this.authService, this.cache);
  }
}

class ApiAuthService {
  constructor (private http: HttpClient) {}

  requestAccessToken(request: TokenRequestModel): Observable<BattleNetTokenModel> {
    return new Observable(observer => {
      this.http.post(`${environment.serviceUrl}/auth/token`, request).subscribe((response: BattleNetTokenModel) => {
        observer.next(response);
      });
    });
  }
}

class ApiCharacterService {
  constructor(
    private http: HttpClient,
    private authService: AuthService) {}

  getCharacter(realmSlug: string, characterName: string): Observable<CharacterModel> {
    return new Observable(observer => {
      this.http.get(`${environment.serviceUrl}/character/${realmSlug}/${characterName}`).subscribe(
        (character: CharacterModel) => {
          observer.next(character);
          observer.complete();
        },
        (err) => {
          switch (err.status) {
            case 401: {
              this.authService.signin();        
            }
            default: {
              observer.error(err);
            }
          }
        });
    });
  }
}

class ApiProfileService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private accessToken: string) {}

  getBattleNetProfile(): Observable<BattleNetProfile> {
    return new Observable(observer => {
      this.http.get(`${environment.serviceUrl}/profile/me?accessToken=${this.accessToken}`).subscribe(
        (profile: BattleNetProfile) => {
          observer.next(profile);
          observer.complete
        },
        (err) => {
          switch (err.status) {
            case 401: {
              this.authService.signin();
              break;
            }
            default: {
              observer.error();
            }
          }
        }
      );
    });
  }
}

class ApiTeamService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cache: RequestCacheService) {}

  createTeam(team: TeamModel): Observable<void> {
    return new Observable(observer => {
      this.authService.getUser().subscribe(
        (user: User) => {
          this.http.post(`${constants.serviceEndpoints.teams.createTeam.replace(':accessToken', user.accessToken)}`, team).subscribe(
            (res: any) => {
              this.cache.remove(`${constants.serviceEndpoints.teams.getManyLeaderTeams.replace(':accessToken', user.accessToken)}`);
              observer.next();
              observer.complete();
            },
            (err) => {
              switch (err.status) {
                case 401: {
                  this.authService.signin();
                }
              }
            });
        });
    });
  }
  
  getManyLeaderTeams(): Observable<TeamModel[]> {
    return new Observable(observer => {
      this.authService.getUser().subscribe(
        (user: User) => {
          this.http.get(`${constants.serviceEndpoints.teams.getManyLeaderTeams.replace(':accessToken', user.accessToken)}`).subscribe(
            (teams: TeamModel[]) => {
              observer.next(teams);
              observer.complete();
            },
            (err) => {
              switch (err.status) {
                case 401: {
                  this.authService.signin();
                }
              }
            });
        });
    });
  }
}