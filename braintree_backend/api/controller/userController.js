const UserModel = require('../model/user');
const CardModel = require('../model/card');
const userController = {};
var braintree = require('braintree');

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: '5skdnk6wzjqxx8pg',
    publicKey: '2hxsq269cwzpwg8y',
    privateKey: 'dd1ef52bc9245d7d767258c3fcb7b84f'
});

userController.login = (req, res) => {
    var email = req.query.email;
    var password = req.query.password;
    UserModel.find({email:email, password: password}).then(users =>{
        if (users.length == 0){
            res.json({error:"Invalid credentials"});
        }
        else {
            res.json({user:users[0]});
        }
    })
}


userController.register = (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    var email = req.query.email;
    var customer_id;
    //============== validation check===============
    UserModel.find({email:email}).then(users =>{

        if (users.length == 0){
            gateway.customer.create({
                email: email
            }, function (err, result) {
                if (err){
                    res.json(err)
                }
                else{
                    if (result.success){
                        // res.json(result)
                        customer_id = result.customer.id;
                        UserModel.create({
                            username,
                            password,
                            email,
                            customer_id
                        }).then(user => {
                            res.json(user);
                        }).catch(error => {
                            res.json(error);
                        })
                    }
                    else {
                        res.json({error:"error"});
                    }
                }

            });
        }
        else {
            res.json({error:"email exists"});
        }
    })
}


userController.validation = (req, res) => {
    var customer_id = req.query.customer_id;
    var country = req.query.country;
    var address1 = req.query.address1;
    var address2 = req.query.address2;
    var city = req.query.city;
    var state = req.query.state;
    var zipcode = req.query.zipcode;
    console.log("req.query", req.query);
    //============== validation check===============
    UserModel.find({customer_id:customer_id}).then(users =>{

        if (users.length != 0){
            console.log('users.length', users.length);
            CardModel.create({
              customer_id,
              country,
              address1,
              address2,
              city,
              state,
              zipcode,
            }).then(user => {
                res.json(user);
            }).catch(error => {
                res.json(error);
            })
        }
        else {
            res.json({error:"customer not exists"});
        }
    })
}

userController.gettoken = (req, res) => {
    var customer_id = req.query.customer_id;
    // res.json({token:{clientToken:"sandbox_9nrp52q8_5skdnk6wzjqxx8pg"}})
    console.log("=====================================");
    console.log(customer_id);
    console.log("=====================================");
    gateway.clientToken.generate({customerId:customer_id}).then(token => {
    // gateway.clientToken.generate({}).then(token => {
        res.json({token:token.clientToken})
    }).catch(err => {
        res.json(err)
    });
}


userController.processpayment = (req, res) => {
    var nonce = req.body.nonce;
    var amount = req.body.chargeAmount;
    // console.log(req);
    console.log(req.body);

    gateway.transaction.sale({

        amount: amount,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        if (result.success) {
        //   res.redirect('checkouts/' + result.transaction.id);
            console.log("===================result=====================")
            console.log(result)
            res.json({transaction: result.transaction})
        } else {
        //   transactionErrors = result.errors.deepErrors();
        //   req.flash('error', {msg: formatErrors(transactionErrors)});
        //   res.redirect('checkouts/new');
            console.log("===================error=====================")
            console.log(err)
            res.json(err);
        }
      });
}
module.exports = userController;