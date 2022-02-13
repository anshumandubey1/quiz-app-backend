const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const auth = require('../middlewares/auth');

router.get('/all', auth.isLoggedIn, auth.isAdmin, UserController.viewAll);
router.get('/:email', auth.isLoggedIn, UserController.view);

router.post(
  '/changePermission',
  auth.isLoggedIn,
  auth.isAdmin,
  UserController.changePermission
);

module.exports = router;
