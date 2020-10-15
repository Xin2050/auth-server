const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy  = require('passport-local');

// Create local strategy
const localOptions = {usernameField:'email'}
const localLogin = new LocalStrategy(localOptions, (email,password,done) => {
    // Verify this email and password, call done with the user
    // if it's the correct email and password
    // otherwise, call done with false


    User.findOne({email}, (err,user) => { // user is what is find from the database
        if(err){ return done(err);}
        if(!user){return done(null,false);}

        //compare passwords - is password equal to user.password?
        user.comparePassword(password, (err,isMath) => {
            if(err){return done(err);}
            if(!isMath){return done(null,false);}

            return done(null,user);

        });
    });

})

// Setup options for JWT Strategy
const jwtOptions = {

    jwtFromRequest:ExtractJwt.fromBodyField("token"), // fromHeader('authorization'),
    secretOrKey:config.secret
};


// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload,done) => {
    // See is the user ID in the payload exists in our database
    // if it does, call 'done' with that other
    // otherwise, call done without a user object
    //console.log("payload",payload);

    User.findById(payload.sub, (err,user) => {
        if(err){return done(err,false);}

        if(user){
            //console.log(user);
            done(null,user);
        }else{
            done(null,false);
        }

    })

})


// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
