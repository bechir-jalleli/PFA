const express = require('express');
const router = express.Router();
const membreEquipeController = require('../controllers/membreEquipeController');
// If you have middleware, make sure to import and use it correctly
// const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

// Routes with middleware if needed
router.get('/', membreEquipeController.getAllMembreEquipes);
// Uncomment and use the middleware if needed
// router.get('/', verifyToken, checkRole('admin', 'responsable', 'chefProject', 'membreEquipe'), membreEquipeController.getAllMembreEquipes);

router.post('/', membreEquipeController.createMembreEquipe);
router.get('/:id', membreEquipeController.getMembreEquipeById);
// Uncomment and use the middleware if needed
// router.get('/:id', verifyToken, checkRole('admin', 'responsable', 'chefProject', 'membreEquipe'), membreEquipeController.getMembreEquipeById);

router.put('/:id', membreEquipeController.updateMembreEquipe);
// Uncomment and use the middleware if needed
// router.put('/:id', verifyToken, checkRole('chefProject', 'membreEquipe'), membreEquipeController.updateMembreEquipe);

router.delete('/:id', membreEquipeController.deleteMembreEquipe);
// Uncomment and use the middleware if needed
// router.delete('/:id', verifyToken, checkRole('chefProject', 'membreEquipe'), membreEquipeController.deleteMembreEquipe);

module.exports = router;
