const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(validateBody(schemas.signUpSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.signInSchema), passportSignIn, UsersController.signIn);

router.route('/signout')
  .get(passportJWT, UsersController.signOut);

router.route('/dashboard')
  .get(passportJWT, UsersController.dashboard);

router.route('/changePassword')
  .post(validateBody(schemas.changePasswordSchema), passportSignIn, UsersController.changePassword);

router.route('/confirmEmail')
  .post(validateBody(schemas.confirmEmailSchema), passportJWT, UsersController.confirmEmail);

router.route('/resendEmailVerification')
  .post(validateBody(schemas.resendEmailVerificationSchema), passportSignIn, UsersController.resendEmailVerification);

module.exports = router;