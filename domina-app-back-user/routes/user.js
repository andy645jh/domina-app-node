const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/userController');

router.get('/', userController.list);

router.post('/', userController.create);
router.post('/login', userController.login);

module.exports = router;