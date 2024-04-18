const express = require('express');
const { addVitalSign, getVitalSigns } = require('../controllers/vitalSignController');
const router = express.Router();

router.post('/', addVitalSign);
router.get('/', getVitalSigns);

module.exports = router;
