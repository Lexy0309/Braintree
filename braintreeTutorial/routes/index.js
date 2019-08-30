var express = require('express');
var router = express.Router();

var userController = require("../api/controller/userController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/login', userController.login);
router.get('/api/register', userController.register);

router.get('/api/gettoken', userController.gettoken);
router.get('/api/validation', userController.validation);
router.post('/api/processpayment', userController.processpayment);

module.exports = router;
