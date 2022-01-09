import jwtDecode, { JwtPayload } from 'jwt-decode';

// in large app this shuld be moved to the token service
// which manage the token functions
export const IsValidToken = (token: string) => {
  if (token) {
    const tokenExpiration = jwtDecode<JwtPayload>(token)?.exp
      ? jwtDecode<JwtPayload>(token).exp
      : undefined;

    if (tokenExpiration) {
      const expInMS = tokenExpiration * 1000;
      if (expInMS > Date.now()) return true;
      else localStorage.removeItem('token');
    }
  }
  return false;
};
