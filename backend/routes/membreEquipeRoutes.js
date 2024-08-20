const express = require('express');
const router = express.Router();
const membreEquipeController = require('../controllers/membreEquipeController');
//const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.get('/',/* checkRole('admin', 'responsable', 'chefProject', 'membreEquipe'),*/ membreEquipeController.getAllMembresEquipe);

//router.use(verifyToken);
router.post('/',/* checkRole('admin', 'responsable', 'chefProject', 'membreEquipe'),*/membreEquipeController.register);

router.get('/:id',/* checkRole('admin', 'responsable', 'chefProject', 'membreEquipe'),*/membreEquipeController.getMembreEquipeById);
router.put('/:id'/*,checkRole( 'chefProject', 'membreEquipe')*/, membreEquipeController.updateMembreEquipe);
router.delete('/:id',/*checkRole( 'chefProject', 'membreEquipe'), */membreEquipeController.deleteMembreEquipe);

module.exports = router;
