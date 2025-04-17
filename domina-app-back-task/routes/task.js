const express = require('express');
const router = express.Router();

//Controllers
const taskController = require('../controllers/taskController');

router.get('/:userId?', taskController.list);

router.post('/', taskController.create);
router.put('/', taskController.update);
router.delete('/', taskController.delete);

module.exports = router;