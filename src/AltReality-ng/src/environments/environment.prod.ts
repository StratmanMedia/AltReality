export const environment = {
  production: true,
  oauth2: {
    client_id: '12b381ed39784747a8984e6c66f68899',
    redirect_uri: 'https://www.wowaltreality.com/auth/signin',
    response_type: 'code',
    scope: 'openid wow.profile',
    authorization_endpoint: 'https://us.battle.net/oauth/authorize',
    token_endpoint: 'https://altrealityapi-tst.azurewebsites.net/auth/token',
    userinfo_endpoint: 'https://us.battle.net/oauth/userinfo'
  },
  baseUrl: 'https://www.wowaltreality.com',
  serviceUrl: 'https://altrealityapi-tst.azurewebsites.net'
};
