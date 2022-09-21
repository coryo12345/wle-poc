import { Record } from 'pocketbase';
import { useClient } from 'src/services/config';
import { useAuthStore } from '../store/authStore';

const client = useClient();
const authStore = useAuthStore();

export async function getAllThemes() {
  const records = await client.records.getFullList('themes', 200 /* batch size */, {
    sort: 'name',
  });
  return records;
}

export async function getAllTags(page: number = 1) {
  const tags = await client.records.getList('tags', page, 50, {
    sort: '-created',
    expand: 'theme',
  });
  return tags.items;
}

export async function getAllTagsByTheme(themeId: string, page: number = 1) {
  const tags = await client.records.getList('tags', page, 50, {
    filter: `theme = '${themeId}'`,
    sort: '-created',
  });
  return tags.items;
}

export async function getTagsByVerseAndUser(verseId: string) {
  const user = authStore.getUser();
  if (!user) return [];
  const response = await client.records.getFullList('tags', 200, {
    filter: `(user = '${user.id}' && verseId = '${verseId}')`,
    expand: 'theme',
  });
  return response;
}

export async function getTagsByThemeAndUser(themeId: string) {
  const user = authStore.getUser();
  if (!user) return [];
  console.log(user.id, themeId);
  const response = await client.records.getFullList('tags', 200, {
    filter: `(user = '${user.id}' && theme = '${themeId}')`,
    sort: '-created',
  });
  return response;
}

export async function addTag(verseId: string, theme: Record) {
  const user = authStore.getUser();
  if (!user) return null;

  // pocketbase doesn't easily support multi-column unique constraints yet,
  //   so we need to do a client-side dupe check.
  const tags = await client.records.getFullList('tags', 200, {
    filter: `(user = '${user.id}' && verseId = '${verseId}' && theme = '${theme.id}')`,
    expand: 'theme',
  });
  if (tags && tags.length) {
    return null;
  }

  // add tag
  const data = { user: user.id, verseId, theme: theme.id };
  const record = await client.records.create('tags', data, {
    expand: 'theme',
  });
  return record;
}

export async function removeTag(tagId: string) {
  await client.records.delete('tags', tagId);
}
