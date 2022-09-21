// Wrapper for pocketbase SDK auth store

import { User } from 'pocketbase';
import { useClient } from 'src/services/config';

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

  return {
    getUser,
    getUserName,
  };
}
