const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

signToken = (user, email_address) => {

  let send_email = (err, emailToken) => {
      const url = `http://localhost:3000/confirmation/${emailToken}`;
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        secure: true,
        auth: {
          user: "niewatiform@gmail.com",
          pass: "nie2020wati"
        }, tls: {
          rejectUnauthorized: true
        }
      });
      
      var mailOptions = {
        from: 'niewatiform@gmail.com', 
        to: email_address, 
        subject: 'Account Verification Token', 
        text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \n' + url 
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }

  send_email = email_address === null? null:send_email

  return JWT.sign({
    iss: 'WATI_FORM',
    sub: user.id
  }, JWT_SECRET,  { expiresIn: '1 hour' }, send_email);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { username, email, password } = req.value.body;

    // Check if there is a user with the same username
    let foundUser = await User.findOne({ "local.username": username });
    if (foundUser) { 
      return res.status(403).json({ error: 'Username is already in use'});
    }

    // Check if there is a user with the same email
    foundUser = await User.findOne({ "local.email": email });
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }
    
    // Create a new user
    const newUser = new User({ 
      methods: ['local'],
      local: {
        username: username,
        email: email, 
        password: password,
        verified: false
      }
    });

    await newUser.save();

    // Generate the token and send verification email
    const token = signToken(newUser, email);

    res.status(200).json({ success: true });
  },

  confirmEmail:async (req, res, next) => {
    const user = req.user
    user.local.verified = true
    await user.save()
    res.status(200).json({ success: true });
  },

  resendEmailVerification:async (req, res, next) => {
    const user = req.user
    const email = user.local.email
    // Generate the token and send verification email
    const token = signToken(user, email);
    res.status(200).json({ success: true });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const user = req.user
    const verified = user.local.verified
    const username = user.local.username
    
    if (verified){
      const token = signToken(user, null);
      res.cookie('access_token', token, {
        httpOnly: true
      });
    }
    
    res.status(200).json({ success: true, verified: verified, username: username});
  },

  signOut: async (req, res, next) => {
    res.clearCookie('access_token');
    // console.log('I managed to get here!');
    res.json({ success: true });
  },

  // googleOAuth: async (req, res, next) => {
  //   // Generate token
  //   const token = signToken(req.user);
  //   res.cookie('access_token', token, {
  //     httpOnly: true
  //   });
  //   res.status(200).json({ success: true });
  // },

  // linkGoogle: async (req, res, next) => {
  //   res.json({ 
  //     success: true,
  //     methods: req.user.methods, 
  //     message: 'Successfully linked account with Google' 
  //   });
  // },

  // unlinkGoogle: async (req, res, next) => {
  //   // Delete Google sub-object
  //   if (req.user.google) {
  //     req.user.google = undefined
  //   }
  //   // Remove 'google' from methods array
  //   const googleStrPos = req.user.methods.indexOf('google')
  //   if (googleStrPos >= 0) {
  //     req.user.methods.splice(googleStrPos, 1)
  //   }
  //   await req.user.save()

  //   // Return something?
  //   res.json({ 
  //     success: true,
  //     methods: req.user.methods, 
  //     message: 'Successfully unlinked account from Google' 
  //   });
  // },

  // facebookOAuth: async (req, res, next) => {
  //   // Generate token
  //   const token = signToken(req.user);
  //   res.cookie('access_token', token, {
  //     httpOnly: true
  //   });
  //   res.status(200).json({ success: true });
  // },

  // linkFacebook: async (req, res, next) => {
  //   res.json({ 
  //     success: true, 
  //     methods: req.user.methods, 
  //     message: 'Successfully linked account with Facebook' 
  //   });
  // },

  // unlinkFacebook: async (req, res, next) => {
  //   // Delete Facebook sub-object
  //   if (req.user.facebook) {
  //     req.user.facebook = undefined
  //   }
  //   // Remove 'facebook' from methods array
  //   const facebookStrPos = req.user.methods.indexOf('facebook')
  //   if (facebookStrPos >= 0) {
  //     req.user.methods.splice(facebookStrPos, 1)
  //   }
  //   await req.user.save()

  //   // Return something?
  //   res.json({ 
  //     success: true,
  //     methods: req.user.methods, 
  //     message: 'Successfully unlinked account from Facebook' 
  //   });
  // },

  dashboard: async (req, res, next) => {
    console.log('(dashboard) I managed to get here!');
    res.json({ 
      secret: "resource",
      methods: req.user.methods
    });
  },

  checkAuth: async (req, res, next) => {
    console.log('(checkAuth) I managed to get here!');

    // Generate the token
    const token = signToken(req.user, null);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.json({ success: true, username: req.user.local.username });
  },

  changePassword: async (req, res, next) => {
    console.log('(changePassword) I managed to get here!');
    const { newPassword } = req.value.body;
    const user = req.user
    user.local.password = newPassword
    await user.save()

    res.json({ success: true});
  }
}