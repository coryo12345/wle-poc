import { User } from 'pocketbase';
import { AuthProviderInfo } from 'src/store/authStore';
import { useClient } from './config';
import { REDIRECT_URL } from 'src/constants';

const client = useClient();

export async function register(email: string, name: string, password: string, passwordConfirm: string) {
  await client.users.create({
    email,
    password,
    passwordConfirm,
  });
  await client.users.authViaEmail(email, password);
  const user = client.authStore.model as User;

  // set user profile data
  const profileId = user?.profile?.id ? user.profile.id : null;
  if (profileId === null) return user;
  await client.records.update('profiles', profileId, {
    name,
  });

  // send verification email
  // await client.users.requestVerification(user.email);
  return user;
}

export async function authViaOAuth2(provider: AuthProviderInfo, code: string) {
  return await client.users.authViaOAuth2(provider.name, code, provider.codeVerifier, REDIRECT_URL);
}

export async function login(email: string, password: string) {
  await client.users.authViaEmail(email, password);
  return client.authStore.model;
}

export async function getAuthMethods() {
  const authMethods = await client.users.listAuthMethods();
  return authMethods.authProviders as AuthProviderInfo[];
}
