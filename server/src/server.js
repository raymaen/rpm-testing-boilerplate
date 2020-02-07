import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
import User from './user/user.model';
import authRoutes from './auth/auth.controller';

// initialize
const app = express();

// Express setup
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'bindi123', // get from env
    httpOnly: true,
    resave: false,
    saveUninitialized: false
  })
);

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/boilerplate_auth', {
  useNewUrlParser: true,
  useCreateIndex: true
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(authRoutes);

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 8080;
app.listen(port);

console.log(`listening on: ${port}`);
