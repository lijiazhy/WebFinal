module.exports = (app) => {
    const controller = require('../controller/controller');

    app.post('/user/create', controller.userCreate);
    app.get('/user/:email', controller.userGet);
    app.post('/user/:email/product', controller.productCreate);
    app.post('/user/:email/product/add', controller.productBuy);
    app.post('/user/:email/product/favorate', controller.productFavorate);

    app.delete('/user/:email/product/:productid', controller.productDelete);
    app.get('/user/:email/product', controller.productGet);
	app.post('/user/:email/password',controller.passwordUpdate);

    app.post('/game', controller.gameCreate);
    app.get('/game/:searchID', controller.gameGet);
    app.post('/comment', controller.commentCreate);
}