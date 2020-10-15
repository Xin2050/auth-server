const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const _ = require('lodash');

const requireAuth = passport.authenticate('jwt',{session:false});
const requireSignin = passport.authenticate('local',{session:false});

module.exports = function (app) {
    app.post('/authCheck',requireAuth, (req,res) => {
        res.send({Login:true,user:
                {id:req.user._id,
                    name:req.user.firstName,
                    email:req.user.email
                }
        });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.post('/check/email', Authentication.checkEmail)
}