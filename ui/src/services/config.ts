// Config for connecting to backend API
import PocketBase from 'pocketbase';

const client = new PocketBase('http://127.0.0.1:8090');

export function useClient() {
  return client;
}

export const VERSE_SERVICE_BASE_API = 'http://127.0.0.1:8001';
