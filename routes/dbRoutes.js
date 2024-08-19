// authRoutes.js
const router = require('express').Router();
const flashcardController = require('../controllers/flashcardController');

router.post('/login', flashcardController.login);
router.post('/signup', flashcardController.signup);
router.get('/subjects/:userId',  flashcardController.getSubjects);
router.post('/subjects', flashcardController.addSubject);

module.exports = router;
