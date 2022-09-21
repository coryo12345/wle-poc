import { defineStore } from 'pinia';
import { getBible } from 'src/services/verseService';

export const useVerseStore = defineStore('verse', {
  state: () => ({
    bible: null as null | Bible,
  }),
  actions: {
    async getBible() {
      if (this.bible !== null) {
        return this.bible;
      }
      this.bible = await getBible();
      return this.bible;
    },
    getVerseNameById(verseId: string) {
      if (!this.bible) return '';
      const [book, chapter, verse] = verseId.split(':');
      const bookName = this.bible[parseInt(book)].name;
      return `${bookName} ${chapter}:${verse}`;
    },
  },
});

export type BibleChapter = {
  id: number;
  name: string;
  chapters: Record<number, number>; // chapter -> number of verses
};

export type Bible = Record<number, BibleChapter>;

export default useVerseStore;
