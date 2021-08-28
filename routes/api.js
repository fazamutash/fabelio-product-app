const express = require('express');
const fabelioController = require('../controllers/fabelio.controller');

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.post('/fabelio', fabelioController.submitSchema, fabelioController.submit);
router.get('/fabelio/:productId', fabelioController.getSchema, fabelioController.get);
router.get('/fabelio/', fabelioController.getAll);



module.exports = router;
