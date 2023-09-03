const { Router } = require('express');
const { createList, deleteList, updateList, findAllLists } = require('../controllers/List.js');
const { isAuthenticated } = require('../middlewares/isAuthenticated.js');
const router = Router();

router.post('/create', isAuthenticated, createList);
router.post('/delete', isAuthenticated, deleteList);
router.put('/update', isAuthenticated, updateList);
router.post('/', isAuthenticated, findAllLists);

module.exports = router;