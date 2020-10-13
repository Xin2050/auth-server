const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const ProductsLoader = require('./controllers/products');

const requireAuth = passport.authenticate('jwt',{session:false});
const requireSignin = passport.authenticate('local',{session:false});

module.exports = function (app) {
    app.get('/',requireAuth, (req,res) => {
        res.send({Login:'OK'});
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.get('/product', ProductsLoader.getProducts);
    app.get('/product/:id',ProductsLoader.getProduct);
}