const express = require('express');
const router = express.Router();
const membreEquipeController = require('../controllers/membreEquipeController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.post('/register', membreEquipeController.register);
router.post('/login', membreEquipeController.login);
router.get('/refresh', membreEquipeController.refresh);
router.post('/logout', membreEquipeController.logout);

router.use(verifyToken);

router.get('/', checkRole('admin', 'responsable', 'chefProject', 'membreEquipe'), membreEquipeController.getAllMembresEquipe);
router.get('/:id', checkRole('admin', 'responsable', 'chefProject', 'membreEquipe'), membreEquipeController.getMembreEquipeById);
router.put('/:id', checkRole('admin', 'responsable', 'chefProject'), membreEquipeController.updateMembreEquipe);
router.delete('/:id', checkRole('admin', 'responsable', 'chefProject'), membreEquipeController.deleteMembreEquipe);

module.exports = router;
