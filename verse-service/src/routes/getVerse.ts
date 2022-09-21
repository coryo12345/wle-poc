import { RequestHandler } from 'express';
import _kjv from '../resources/kjv.json';

const KJV = _kjv as { ari: string; name: string; verse: string }[];

/**
 * GET
 * /verse/:id
 */
export const getVerse: RequestHandler = (req, res) => {
  const verseId = req.params.id;
  const verse = KJV.find((verse) => verse.ari == verseId);
  res.status(200).json({ id: verseId, verse });
};

/**
 * GET
 * /verse/:id1/:id2
 */
export const getVerseRange: RequestHandler = (req, res) => {
  let id1 = req.params.id1;
  let id2 = req.params.id2;

  // get in correct order
  if (id1.localeCompare(id2) > 1) {
    id1 = req.params.id2;
    id2 = req.params.id1;
  }

  // find first until last
  enum FindStatus {
    FOUND_NONE,
    FOUND_FIRST,
    FOUND_SECOND,
  }
  let status = FindStatus.FOUND_NONE;
  const verses: unknown[] = [];
  KJV.forEach((verse) => {
    if (status === FindStatus.FOUND_NONE) {
      if (verse.ari == id1) {
        verses.push(verse);
        if (id1 === id2) status = FindStatus.FOUND_SECOND;
        else status = FindStatus.FOUND_FIRST;
      }
    }
    // have not found second
    else if (status === FindStatus.FOUND_FIRST) {
      verses.push(verse);
      if (verse.ari == id2) {
        status = FindStatus.FOUND_SECOND;
      }
    }
  });

  res.status(200).json({ id1, id2, verses });
};

export enum a {}
