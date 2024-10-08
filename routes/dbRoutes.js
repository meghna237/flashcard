// authRoutes.js
const router = require('express').Router();
const flashcardController = require('../controllers/flashcardController');

router.post('/login', flashcardController.login);
router.post('/signup', flashcardController.signup);
router.get('/subjects/:user',  flashcardController.getSubjects);
router.post('/subjects', flashcardController.addSubject);
router.get('/questions', flashcardController.getFlashcardsBySubject);
router.post('/addquestions', flashcardController.addFlashcard);
router.delete('/questions/:id', flashcardController.deleteFlashcard);

module.exports = router;
