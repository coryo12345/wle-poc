import buildBookChapterVerse from './resources/buildBookChapterVerse';
import app from './app';
import config from './config';

buildBookChapterVerse.build();

app.listen(config.port, () => {
  console.log(`WLE Verse Service: ${config.name} ${config.version}`);
  console.log(`WLE Verse Service: Listening on ${config.port} with NODE_ENV=${config.nodeEnv}`);
});
