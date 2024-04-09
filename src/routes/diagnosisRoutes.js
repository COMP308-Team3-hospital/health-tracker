const express = require('express');
const router = express.Router();
const { diagnoseCondition } = require('../controllers/diagnosisController');

// Route to get a diagnosis
router.post('/', diagnoseCondition);

module.exports = router;
