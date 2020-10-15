const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();

    return jwt.encode({sub: user.id,
        name:user.firstName,
        email:user.email,
        iat: timestamp},
        config.secret);

}

function createAuthUser(user){
    return {id:user.id,name:user.firstName,email:user.email}
}

exports.checkEmail = function (req,res,next){

    const {email} = req.body;
    User.findOne({email},function(err,existingUser){

        if (err) {
            return next(err);
        }
        if(existingUser){

            return res.send({rs:false,message:'Email is in use'});
        }else{
            return res.send({rs:true,message:'This email is Available!'});
        }

    })
}

exports.signin = function (req,res,next){
    //User has already had their email and password auth'd
    //We just need to give them a token
    //console.log(req);
    res.send({token:tokenForUser(req.user),user:createAuthUser(req.user)})
}


exports.signup = function (req, res, next) {

    const {email, password,iskeep,firstName,lastName} = req.body;

    if (!email || !password) {
        return res.send({rs:false,error: 'You must provide email and password '});
    }
    //See if a user with the given email exists
    User.findOne({email}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        //If a user with email does exist, return an error
        if (existingUser) {
            return res.send({rs:false,error: 'Email is in use'});
        }

        //If a user with email does NOT exist, create and save user record
        const user = new User({email, password,lastName,firstName,iskeep});
        user.save((err) => {
            if (err) {
                return next(err);
            }
            // Respond to request indicating the user was created
            console.log("now the user passwordis", user.password);
            res.json({rs:true,token:tokenForUser(user),user:createAuthUser(user)});
        });


    });

}