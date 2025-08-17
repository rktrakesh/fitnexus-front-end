export const authConfig = {
  clientId: "fitnexus-oauth-2-pkce-client",
  authorizationEndpoint:
    "http://localhost:8181/realms/fitnexus-oauth-2/protocol/openid-connect/auth",
  tokenEndpoint:
    "http://localhost:8181/realms/fitnexus-oauth-2/protocol/openid-connect/token",
  redirectUri: "http://localhost:5173",
  scope: "openid profile email offline_access",
  onRefreshTokenExpire: (event) => event.logIn(),
};
