// Config for connecting to backend API
import PocketBase from 'pocketbase';

let client: PocketBase;
if (import.meta.env.PROD) {
  client = new PocketBase('/api/realtime');
} else {
  client = new PocketBase('http://127.0.0.1:8090');
}

export function useClient() {
  return client;
}

let _VERSE_SERVICE_BASE_API: string;
if (import.meta.env.PROD) {
  _VERSE_SERVICE_BASE_API = '/api/verse';
} else {
  _VERSE_SERVICE_BASE_API = 'http://127.0.0.1:8001';
}
export const VERSE_SERVICE_BASE_API = _VERSE_SERVICE_BASE_API;
