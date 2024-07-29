const express = require('express');
const router = express.Router();
const tacheController = require('../controllers/tacheController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.use(verifyToken);

router.post('/', checkRole( 'chefProject'), tacheController.createTache);
router.get('/', checkRole('admin', 'responsable', 'chefProject', 'membreEquipe'), tacheController.getAllTaches);
router.get('/:id', checkRole('admin', 'responsable', 'chefProject', 'membreEquipe'), tacheController.getTacheById);
router.put('/:id', checkRole('admin', 'responsable', 'chefProject'), tacheController.updateTache);
router.delete('/:id', checkRole( 'chefProject'), tacheController.deleteTache);

module.exports = router;
