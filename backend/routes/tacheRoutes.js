const express = require('express');
const router = express.Router();
const tacheController = require('../controllers/tacheController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.use(verifyToken);
router.use(checkRole('admin', 'responsable', 'chefProject', 'membreEquipe'));

router.get('/', tacheController.getAllTaches);
router.get('/:id', tacheController.getTacheById);


router.post('/',tacheController.createTache);
router.put('/:id',   tacheController.updateTache);
router.delete('/:id',tacheController.deleteTache);

module.exports = router;
