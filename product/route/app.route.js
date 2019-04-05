module.exports = (app) => {
    const controller = require('../controller/controller');

    app.post('/user/create', controller.userCreate);
    app.post('/user/:email/product', controller.productCreate);
    app.put('/user/:email/product/:productid', controller.productUpdate);
    app.delete('/user/:email/product/:productid', controller.productDelete);
    app.get('/user/:email/product', controller.productGet);
}