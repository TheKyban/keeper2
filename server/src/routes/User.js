const { Login, Register } = require("../controllers/User.js");
const { Router } = require('express');

const router = Router();

router.post('/create', Register);
router.post('/login', Login);

module.exports = router;
