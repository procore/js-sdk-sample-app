import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import logger from 'morgan';
import { router } from './routes';

export const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(
  cookieSession({
    name: 'sessions',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secret: process.env.SESSION_PASSWORD,
    secure: process.env.NODE_ENV === 'production',
  })
);

app.use('/', router);
