const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const {is_dev, enable_email_verification, nodemailer_transporter} = require('../constants')
const EncryptString = require('../EncryptString');

signToken = (user, email_address, verifiedStr) => {

  let send_confirmation_email = (err) => {
      let url = is_dev? 'http://localhost:3000/' : 'https://atconsideration.rdc.nie.edu.sg/'
      url = url + `confirmEmail/${verifiedStr}`;
      
      var mailOptions = {
        from: 'rdcwati@rdc.nie.edu.sg', 
        to: email_address, 
        subject: 'Account Verification Token', 
        // html: '<div><p>Hello</p> <p>Please verify your account by clicking this <a href={' + url + '}>link</a></p></div>'
        html:'<div><p>Hello,</p> <p>Please verify your account by clicking the link below</p><p>' + url + '</p></div>'
      };
      
      nodemailer_transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("EMAIL ERROR")
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }

  send_confirmation_email = email_address === null? null:send_confirmation_email

  return JWT.sign({
    iss: 'WATI_FORM',
    sub: user.id
  }, JWT_SECRET,  { expiresIn: '1 hour' }, send_confirmation_email);
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

    let verifiedStr = getVerifiedStr(newUser)

    // Generate the token and send verification email
    const token = signToken(newUser, email, verifiedStr);

    res.status(200).json({ success: true });
  },

  confirmEmail:async (req, res, next) => {
    const verifiedStr = EncryptString.decrypt(req.value.body.token).split("|")

    filter = {
      "local.username": verifiedStr[0],
      "local.email": verifiedStr[1],
      "local.password": verifiedStr[2],
    }

    let user = await User.findOne(filter)
    if(user){
      user.local.verified = true
      await user.save()
      res.status(200).json({ success: true });
    } else{
      res.status(200).json({ success: false });
    }
  },

  resendEmailVerification:async (req, res, next) => {
    const user = req.user
    const email = user.local.email
    const verifiedStr = getVerifiedStr(user)
    console.log(verifiedStr)
    // Generate the token and send verification email
    const token = signToken(user, email, verifiedStr);
    res.status(200).json({ success: true });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const user = req.user
    const verified = user.local.verified
    const username = user.local.username
    
    if (enable_email_verification){
      if (verified){
        const token = signToken(user, null, null);
        res.cookie('access_token', token, {
          httpOnly: true
        });
      }
      res.status(200).json({ verified: verified, username: username});
    } else{
      const token = signToken(user, null, null);
        res.cookie('access_token', token, {
          httpOnly: true
        });
      res.status(200).json({ verified: true, username: username});

    }
    

    
  },

  signOut: async (req, res, next) => {
    res.clearCookie('access_token');
    // console.log('I managed to get here!');
    res.json({ success: true });
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

function getVerifiedStr(user){
  return EncryptString.encrypt(user.local.username + "|" + user.local.email + "|" + user.local.password )
}