const { Router } = require('express');
const { createBoard, deleteBoard, updateBoard, findAllBoards } = require('../controllers/Board.js');
const { isAuthenticated } = require('../middlewares/isAuthenticated.js');
const router = Router();

router.post('/create', isAuthenticated, createBoard);
router.post('/delete', isAuthenticated, deleteBoard);
router.put('/update', isAuthenticated, updateBoard);
router.get('/', isAuthenticated, findAllBoards);

module.exports = router;