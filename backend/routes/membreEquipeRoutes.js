const express = require('express');
const router = express.Router();
const membreEquipeController = require('../controllers/membreEquipeController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');
/*router.use(verifyToken);
router.use(checkRole('admin', 'responsable', 'chefProject', 'membreEquipe'));
*/

router.get('/', membreEquipeController.getAllMembreEquipes);
router.post('/', membreEquipeController.createMembreEquipe);
router.get('/:id', membreEquipeController.getMembreEquipeById);
router.put('/:id', membreEquipeController.updateMembreEquipe);
router.delete('/:id', membreEquipeController.deleteMembreEquipe);

module.exports = router;
