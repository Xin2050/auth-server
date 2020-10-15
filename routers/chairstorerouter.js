const ProductsLoader = require('../controllers/products');

module.exports = function (app) {
    app.get('/product', ProductsLoader.getProducts);
    app.get('/product/:id',ProductsLoader.getProduct);
}