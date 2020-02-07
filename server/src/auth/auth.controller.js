import express from 'express';
import User from '../user/user.model';
import passport from 'passport';
import { isLoggedIn } from './auth.middleware';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('./auth/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login' // option if login credentials are wrong where the user gets redirected to
  }),
  (req, res) => {
    res.redirect('/');
  }
);

// Register
router.post('/register', (req, res) => {
  User.register(
    new User({
      username: req.body.username
    }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        return res.redirect('/register');
      }

      res.redirect('/');
    }
  );
});

// Logout, with the middleware the user needs to be authenticated to use this link
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  res.redirect('/login');
});

export default router;
