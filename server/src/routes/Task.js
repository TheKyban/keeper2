const { Router } = require('express');
const { createTask, deleteTask, updateTask, findAllTasks, changeTaskPostion } = require('../controllers/Task.js');
const { isAuthenticated } = require('../middlewares/isAuthenticated.js');
const router = Router();

router.post('/create', isAuthenticated, createTask);
router.post('/delete', isAuthenticated, deleteTask);
router.put('/update', isAuthenticated, updateTask);
router.post('/', isAuthenticated, findAllTasks);
router.post('/position', isAuthenticated, changeTaskPostion);

module.exports = router;