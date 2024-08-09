const express = require('express');
const router = express.Router();
const chefProjectController = require('../controllers/chefProjectController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.post('/register', chefProjectController.register);
router.post('/login', chefProjectController.login);
router.get('/refresh', chefProjectController.refresh);
router.post('/logout', chefProjectController.logout);

/*  router.use(verifyToken);*/

router.get('/', /* checkRole('admin', 'responsable', 'chefProject'),*/ chefProjectController.getAllChefProjects);
router.get('/:id', /* checkRole('admin', 'responsable', 'chefProject'),*/ chefProjectController.getChefProjectById);
router.put('/:id', /*  checkRole('admin', 'responsable', 'chefProject'),*/ chefProjectController.updateChefProject);
router.delete('/:id',/* checkRole('admin', 'responsable', 'chefProject'),*/ chefProjectController.deleteChefProject);

module.exports = router;
