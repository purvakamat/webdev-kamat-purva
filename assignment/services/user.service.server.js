/**
 * Created by kamat on 10/24/2017.
 */

module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var bcrypt = require('bcrypt-nodejs');
  var auth = authorized;

  var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
  };

  app.post("/api/user", auth, createUser);
  app.post("/api/login", passport.authenticate('local'), login);
  app.post("/api/logout", logout);
  app.post("/api/register", register);
  app.get("/api/loggedin", loggedin);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", auth, updateUser);
  app.delete("/api/user/:userId", auth, deleteUser);
  app.get("/facebook/login", passport.authenticate('facebook', { scope : 'email' }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/user',
      failureRedirect: '/login'
    }));

  passport.use(new LocalStrategy(localStrategy));
  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
      res.send(401);
    } else {
      next();
    }
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function localStrategy(username, password, done) {
    userModel
      .findUserByUsername(username)
      .then(
        function(user) {
          // if the user exists, compare passwords with bcrypt.compareSync
          if(user && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      );
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function register (req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
      .createUser(user)
      .then(
        function(user){
          if(user){
            req.login(user, function(err) {
              if(err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        }
      );
  }

  function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user).then(function (user) {
      res.json(user);
    });
  }

  function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    var user = null;
    if(username != undefined && password != undefined)
      userModel.findUserByCredentials(username, password).then(function (user) {
        if(user)
          res.json(user);
        else
          res.status(404).send("No user");
      });
    else if(username != undefined)
      userModel.findUserByUsername(username).then(function (user) {
        if(user)
          res.json(user);
        else
          res.status(404).send("No user");
      });
  }

  function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel.findUserById(userId).then(function (user) {
      if(user)
        res.json(user);
      else
        res.status(404).send("No user");
    });
  }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    var userNew = req.body;

    userModel.updateUser(userId, userNew).then(function (response) {
      if(response.n >0 || response.nModified > 0)
        res.json("User updated");
      else
        res.status(404).send("User was not updated");
    });
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];

    userModel.deleteUser(userId).then(function (response) {
      if(response.deletedCount == 1)
        res.json("User deleted");
      else
        res.status(404).send("User cannot be deleted");
    });
  }

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel
      .findUserByFacebookId(profile.id)
      .then(
        function(user) {
          if(user) {
            return done(null, user);
          } else {
            var names = profile.displayName.split(" ");
            var newFacebookUser = {
              lastName:  names[1],
              firstName: names[0],
              email:     profile.emails ? profile.emails[0].value:"",
              facebook: {
                id:    profile.id,
                token: token
              }
            };
            return userModel.createUser(newFacebookUser);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      )
      .then(
        function(user){
          return done(null, user);
        },
        function(err){
          if (err) { return done(err); }
        }
      );
  }

}
