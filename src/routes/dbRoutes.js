// authRoutes.js
const router = require('express').Router();
const loginController = require('../controllers/loginController');

router.post('/api/login', loginController.login);
router.post('/api/signup', loginController.signup);



module.exports = router;
