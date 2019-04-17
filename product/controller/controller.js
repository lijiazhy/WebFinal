const User = require('../model/user');
const Game = require('../model/game');
const Comment = require('../model/comment');

exports.userCreate = (req, res) => {

    console.log("new user name: " + req.body.userName);
    // console.log(req.body.passWord);
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

exports.gameCreate = (req, res) => {
    console.log("new Game name: " + req.body.gameName);
	if(!req.body.gameName||!req.body.gamePrice||!req.body.company||!req.body.description||!req.body.pictuer1||!req.body.picture2||!req.body.url||!req.body.searchID){
	  return res.status(500).send({
          message: "No field can be empty!"
      })
	}
    Game.find( {"gameName": req.body.gameName})
    .then( games => {
        if (games.length != 0) {
            return res.status(500).send({
                message: "the Game has existed!"
            })
        }

        const game = new Game({
            searchID: req.body.searchID,
            gameName: req.body.gameName,
            description: req.body.description,
            gamePrice: req.body.gamePrice,
            company: req.body.company,
            pictuer1: req.body.pictuer1,
            picture2: req.body.picture2,
            url: req.body.url
        });
    
        game.save().then(() => {
            res.send({'message':'Game create successfully'});
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

exports.gameGet = (req, res) => {
    console.log(req.params.searchID);
    Game.findOne({'searchID': req.params.searchID})
    .then( game => {
        if (!game) {
            return res.status(401).send({
                message: "can not find this game"
            });
        }
        return res.status(200).send(game);
    })
}

exports.productCreate = (req, res) => {
    if (req.body.productName == undefined) {
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
    
        User.updateOne({"userName": req.params.email},{$push:{products:{productName: req.body.productName, state: req.body.state}}})
        .then(() => {
            //res.send(user);
            return res.status(200).send({
                message: "Add product successfully"
            });
        });
    });
}


exports.productBuy = (req, res) => {
    console.log(req.body.productName);
    if (req.body.productName == undefined) {
        return res.status(400).send({
            message: "Empty name is not accepted!"
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
            if (user.products[i].productName == req.body.productName) {
                break;
            }
        }

        if (i == user.products.length) {
            User.updateOne({"userName": req.params.email},{$push:{products:{productName: req.body.productName, state: 0}}})
            .then( () => {
                return res.status(200).send({
                    message: "Buy successfully1!"
                });
            });
            return;
        }

        if (user.products[i].state == -1) {
            User.updateOne({"userName": req.params.email, 'products.productName': req.body.productName}
            ,{$set:{'products.$.state':1}})
            .then( () => {
                return res.status(200).send({
                    message: "Buy successfully2!"
                });
            });
            return;
        }

    });

}

exports.productFavorate = (req, res) => {
    console.log(req.body.productName);
    if (req.body.productName == undefined) {
        return res.status(400).send({
            message: "Empty name is not accepted!"
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
            if (user.products[i].productName == req.body.productName) {
                break;
            }
        }

        if (i == user.products.length) {
            User.updateOne({"userName": req.params.email},{$push:{products:{productName: req.body.productName, state: -1}}})
            .then( () => {
                return res.status(200).send({
                    message: "Add to favorate successfully!"
                });
            });
            return;
        }

        if (user.products[i].state == 0) {
            User.updateOne({"userName": req.params.email, 'products.productName': req.body.productName}
            ,{$set:{'products.$.state':1}})
            .then( () => {
                return res.status(200).send({
                    message: "Add to favorate successfully!"
                });
            });
            return;
        }

        if (user.products[i].state == 1) {
            User.updateOne({"userName": req.params.email, 'products.productName': req.body.productName}
            ,{$set:{'products.$.state':0}})
            .then( () => {
                return res.status(200).send({
                    message: "remove from favorate successfully!"
                });
            });
            return;
        }

        if (user.products[i].state == -1) {
            User.updateOne({"userName": req.params.email, 'products.productName': req.body.productName}
            ,{$pull:{'products':{productName: req.body.productName}}})
            .then( () => {
                return res.status(200).send({
                    message: "remove from favorate successfully!"
                });
            });
            return;
        }

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

exports.commentCreate = (req, res) => {
    console.log( "user: " + req.body.userName + " add comment to " + req.body.gameName);
    if (req.body.content == undefined) {
        return res.status(400).send({
            message: 'The comment can\'t be empty' 
        });
    }

    const comment = new Comment({
        content: req.body.content,
        userName: req.body.userName,
        gameName: req.body.gameName
    });
    comment.save().then( () => {
        return res.status(200).end({
            message: 'comment successfully'
        });
    })
}

exports.passwordUpdate = (req, res) => {
	console.log(req.body.passWord+"bbbbb");
    User.findOne({"userName": req.params.email})
    .then( user => {
        User.updateOne({"userName": req.params.email}
		,{$set:{'passWord':req.body.passWord}})
        .then( () => {
            return res.status(200).send({
                message: "Update successfully!"
            });
        });
        return;
    });

}