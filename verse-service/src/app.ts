import cors from 'cors';
import express from 'express';
import config from './config';
import root from './routes';

const app = express();

// route-dependent middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.clientOrigins[config.nodeEnv],
  })
);

// routes
app.use('/', root);

// here would be any error-handling middleware

export default app;
