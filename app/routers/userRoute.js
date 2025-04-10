const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.js');

router.post('/', userController.handleUserSignup);
router.post('/login', userController.handleUserLogin);

module.exports = router;