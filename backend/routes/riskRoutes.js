
const express = require('express');
const router = express.Router();
const { createRisks, getRiskById } = require('../controllers/riskController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.use(verifyToken);
router.use(checkRole('admin'));

router.post('/', createRisks);
router.get('/:id', getRiskById);

module.exports = router;
