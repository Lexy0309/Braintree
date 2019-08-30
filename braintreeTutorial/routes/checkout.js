var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
  

  // Use the payment method nonce here
  // var nonceFromTheClient = req.body.paymentMethodNonce;
  // // Create a new transaction for $10
  // var newTransaction = gateway.transaction.sale({
  //   amount: '10.00',
  //   paymentMethodNonce: nonceFromTheClient,
  //   options: {
  //     // This option requests the funds from the transaction
  //     // once it has been authorized successfully
  //     submitForSettlement: true
  //   }
  // }, function(error, result) {
  //     if (result) {
  //       res.send(result);
  //     } else {
  //       res.status(500).send(error);
  //     }
  // });
});

module.exports = router;
