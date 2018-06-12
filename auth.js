const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const models = require('./models');
require('dotenv').config()


const setupAuth = (app) => {
    app.use(cookieParser());

    app.use(session({
        secret: 'whatever',
        resave: true,
        saveUninitialized: true
    }));

    passport.use(new GitHubStrategy({
        clientID:process.env.client_id,
        clientSecret:process.env.client_secret,
        callbackURL: 'http://localhost:3000/github/auth'
    }, (accessToken, refreshToken, profile, done)=>{
        models.user.findOrCreate({where:{
            githubid: profile.id
        }}).then(result => {
            return done(null, result[0]);
        })
        .catch(done)
    }));

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        done(null, id);
    });

    app.use(passport.initialize());

    app.use(passport.session());

    app.get ('/login', passport.authenticate('github'));
    app.get ('/logout', function (req, res, next){
        req.logout();
        res.redirect('/');
    });

    app.get('/github/auth', 
        passport.authenticate('github', {failureRedirect: '/login'}),
        (req, res)=>{
            res.redirect('/');
        });
};

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;