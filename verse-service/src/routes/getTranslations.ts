import { RequestHandler } from 'express';

/**
 * GET
 * /translations
 */
export const getTranslations: RequestHandler = (req, res) => {
  const translations = ['KJV'];
  return res.json(translations);
};
