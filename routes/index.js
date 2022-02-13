var express = require('express');
var router = express.Router();

const UserController = require('../controllers/user');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});
router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;
