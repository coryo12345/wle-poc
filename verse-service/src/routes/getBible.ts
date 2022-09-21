import { RequestHandler } from 'express';
import buildBookChapterVerse from '../resources/buildBookChapterVerse';

/**
 * GET
 * /bible
 */
export const getBible: RequestHandler = (req, res) => {
  const bible = buildBookChapterVerse.get();
  return res.json(bible);
};
