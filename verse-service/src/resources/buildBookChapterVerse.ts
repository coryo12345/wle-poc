import _kjv from './kjv.json';

type Book = {
  id: number;
  name: string;
  chapters: Record<number, number>;
};

export type BookChapterVerse = Record<number, Book>;

let _bible: BookChapterVerse;

function build() {
  if (_bible) return;

  const KJV = _kjv as { ari: string; name: string; verse: string }[];
  const bible: BookChapterVerse = {};
  KJV.forEach((verse) => {
    const bookId = parseInt(verse.ari.split(':')[0]);
    if (bible[bookId] == undefined) {
      const bookname = verse.name.split(' ').slice(0, -1).join(' ');
      bible[bookId] = {
        id: bookId,
        name: bookname,
        chapters: {},
      };
    }

    const chapter = parseInt(verse.ari.split(':')[1]);
    if (bible[bookId].chapters[chapter]) {
      bible[bookId].chapters[chapter]++;
    } else {
      bible[bookId].chapters[chapter] = 1;
    }
  });

  _bible = bible;
}

function get(): BookChapterVerse {
  if (!_bible) build();
  return _bible;
}

export default { build, get };
