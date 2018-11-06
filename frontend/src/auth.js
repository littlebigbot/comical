import jwtDecode from 'jwt-decode';
import storage from 'store';

export const isAuthenticated = () => {
  const jwt = storage.get('jwt');
  const now = new Date();

  if(jwt) {
    const decodedToken = jwtDecode(jwt);
    return decodedToken.exp < now.getTime();
  }
  return false;
}
