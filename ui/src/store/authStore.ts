// Wrapper for pocketbase SDK auth store

import { User } from 'pocketbase';
import { useClient } from 'src/services/config';
import jwtDecode from 'jwt-decode';
import { JWT } from 'src/models/jwt';

export type AuthProviderInfo = {
  name: string;
  codeVerifier: string;
  state: string;
  authUrl: string;
};

export function useAuthStore() {
  const client = useClient();

  function getUser() {
    return client.authStore.model;
  }

  function getUserName() {
    const user = client.authStore.model;
    if (user) {
      if ((user as User).profile && (user as User).profile?.name) {
        return (user as User).profile?.name;
      } else if ((user as User).email.length) {
        return user.email.split('@')[0];
      }
    }
    return 'Unknown';
  }

  function getTokenExpDate() {
    const encodedToken = client.authStore.token;
    if (!encodedToken) return new Date(0);
    const decodedToken = jwtDecode<JWT>(encodedToken);
    return new Date(decodedToken.exp * 1000); // convert to ms
  }

  return {
    getUser,
    getUserName,
    getTokenExpDate,
  };
}
