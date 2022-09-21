import { getTranslations } from './getTranslations';
import { getBible } from './getBible';
import express from 'express';
import { getVerse, getVerseRange } from './getVerse';

const root = express.Router();

root.get('/verse/:id1/:id2', getVerseRange);
root.get('/verse/:id', getVerse);
root.get('/bible', getBible);
root.get('/translations', getTranslations);

export default root;
