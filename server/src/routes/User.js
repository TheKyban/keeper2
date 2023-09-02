const { Login, Register, Logout } = require("../controllers/User.js");
const { Reload } = require("../controllers/Reload.js");
const { Router } = require('express');

const router = Router();

router.post('/create', Register);
router.post('/login', Login);
router.get('/logout', Logout);
router.get('/reload', Reload);

module.exports = router;
