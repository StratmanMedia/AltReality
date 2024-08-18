export const environment = {
  production: false,
  oauth2: {
    client_id: 'ff9af71444e34fb6a21c4ffa693833c3',
    redirect_uri: 'http://localhost:4200/auth/signin',
    response_type: 'code',
    scope: 'wow.profile',
    authorization_endpoint: 'https://us.battle.net/oauth/authorize',
    token_endpoint: 'https://localhost:44381/auth/token',
    userinfo_endpoint: 'https://us.battle.net/oauth/userinfo'
  },
  baseUrl: 'https://localhost:4200',
  serviceUrl: 'https://localhost:44381'
};
