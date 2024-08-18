import { environment } from "src/environments/environment";

export const constants = {
  storageKeys: {
    returnUrl: 'ar.auth.returnUrl',
    currentUser: 'ar.currentUser',
    battleNetProfile: 'ar.battleNetProfile',
    characterView: 'ar.characters.view',
    characterSort: 'ar.characters.sort',
    characterLevelFilter: 'ar.characters.filters.level'
  },
  routes: {
    teamsList: '/user/teams'
  },
  serviceEndpoints: {
    teams: {
      createTeam: `${environment.serviceUrl}/teams?accessToken=:accessToken`,
      getManyLeaderTeams: `${environment.serviceUrl}/teams/leader/me?accessToken=:accessToken`
    }
  }
}
