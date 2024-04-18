const express = require('express');
const { createTip, getTipsByPatient } = require('../controllers/tipController');
const router = express.Router();

router.post('/', createTip);
router.get('/:patientId', getTipsByPatient);

module.exports = router;
