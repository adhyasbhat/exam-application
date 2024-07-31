const candidateResponseController = require('../Controllers/candidateresponsecontroller');
const express = require('express');
const router = express.Router();

router.post('/addAnswer', candidateResponseController.addAnswer);
router.get('/getAllUserAnswer', candidateResponseController.getAllUserAnswer);
router.get('/getAnswerByEmail', candidateResponseController.getAnswerByEmail);