const express = require('express');
const router = express.Router();
const riskController = require('../controllers/riskController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.post('/', upload.single('file'), riskController.createRisk);
router.get('/', riskController.getAllRisks);
router.get('/:id', riskController.getRisk);

module.exports = router;
