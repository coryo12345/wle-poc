import { Record, User } from 'pocketbase';
import { Bible } from 'src/store/verseStore';
import { get } from './base';
import { VERSE_SERVICE_BASE_API } from './config';

export async function getBible() {
  const response = await get(`${VERSE_SERVICE_BASE_API}/bible`);
  return response as Bible;
}

export async function getVerse(verseId: string) {
  const response = await get(`${VERSE_SERVICE_BASE_API}/verse/${verseId}`);
  return response as Verse;
}

export type Verse = {
  id: string;
  verse: {
    ari: string;
    name: string;
    verse: string;
  };
};
