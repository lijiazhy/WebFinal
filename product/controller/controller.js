const User = require('../model/user');

exports.userCreate = (req, res) => {

    console.log(req.body.userName);
    console.log(req.body.passWord);
    User.find({"userName": req.body.userName})
    .then( users => {

        if (users.length != 0) {
            return res.status(500).send({
                message: "This email has been registed"
            });
        }

        var emailRegex = new RegExp("^\\w+[!#$%&'*+-/=?^_`{|}~A-Za-z0-9]*[A-Za-z0-9]@\\w+(\\.\\w+)+$");
        var passwordRegex = new RegExp("^(?=.*\\d+)(?=.*[a-zA-Z]+)(?=.*\\W+)[A-Za-z0-9\\W]{8,}$");
        if (!emailRegex.test(req.body.userName)) {
            return res.status(400).send({
                message: "Illegal E-mail format!!"
            });
        }

        if (!passwordRegex.test(req.body.passWord)) {
            return res.status(400).send({
                message: "invalidate password, The password should contain 8 digits at least, A-Z, a-z, 0-9, and specific symbol"
            })
        }

        const user = new User({
            userName: req.body.userName,
            passWord: req.body.passWord
        });
        user.save().then(() => {
            res.send({'message':'User created successfully'});
        });
    }); 
}

exports.userGet = (req, res) => {
    console.log(req.params.email);
    User.findOne({"userName": req.params.email})
    .then( user => {
        if(!user) {
            return res.status(401).send({
                message: "The user is not exist!"
            });
        }
        return res.status(200).send(user);
    })
}

exports.productCreate = (req, res) => {
    if (req.body.productName == undefined || req.body.productPrice == undefined) {
            return res.status(400).send({
                message: "Empty name or price is not accepted!"
            });
    }
    User.findOne({"userName": req.params.email})
    .then( user => {
        if (!user) {
            return res.status(401).send({
                message: "The user is not exist!"
            });
        }
    
        User.updateOne({"userName": req.params.email},{$push:{products:{productName: req.body.productName, productPrice: req.body.productPrice}}})
        .then(() => {
            //res.send(user);
            return res.status(200).send({
                message: "Add product successfully"
            });
        });
    });
}


exports.productUpdate = (req, res) => {
    if (req.body.productName == undefined || req.body.productPrice == undefined) {
        return res.status(400).send({
            message: "Empty name or price is not accepted!"
        });
    }

    User.findOne({"userName": req.params.email})
    .then( user => {
        if (!user) {
            return res.status(401).send({
                message: "The user is not exist!"
            });
        }
        var i = 0;
        for (; i < user.products.length; i++) {
            if (user.products[i]._id == req.params.productid) {
                break;
            }
        }

        if (i == user.products.length) {
            return res.status(401).send({
                message: "The product is not exist"
            });
        }
        User.updateOne({"userName": req.params.email,'products._id':req.params.productid}
        ,{$set:{'products.$.productName':req.body.productName, 'products.$.productPrice':req.body.productPrice}})
        .then(() => {
            return res.status(204).send();
        });
    });

}


exports.productDelete = (req, res) => {
    User.findOne({'userName': req.params.email})
    .then( user => {
        if(!user) {
            return res.status(401).send({
                message: "The user is not exist!"
            });
        }

        var i = 0;
        for (; i < user.products.length; i++) {
            if (user.products[i]._id == req.params.productid) {
                break;
            }
        }

        if (i == user.products.length) {
            return res.status(401).send({
                message: "The product is not exist"
            });
        }

        User.updateOne({"userName": req.params.email, 'products._id': req.params.productid}
        , {$pull:{'products':{_id: req.params.productid}}})
        .then(() => {
            return res.status(204).send();
        })
    });
}


exports.productGet = (req, res) => {
    User.findOne({"userName":req.params.email})
    .then( user => {
        if (!user) {
            return res.status(401).send({
                message: "The user is not exist"
            });
        }

        res.status(200).send(user.products);
    });
}