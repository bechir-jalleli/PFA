const express = require('express');
const router = express.Router();
const chefProjectController = require('../controllers/chefProjectController');
//const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.get('/', /*checkRole('admin', 'responsable', 'chefProject'),*/ chefProjectController.getAllChefProjects);

//router.use(verifyToken);

router.get('/:id', /*checkRole('admin', 'responsable', 'chefProject'),*/ chefProjectController.getChefProjectById);
router.put('/:id',/* checkRole('responsable', 'chefProject'),*/ chefProjectController.updateChefProject);
router.delete('/:id', /*checkRole('responsable', 'chefProject'), */chefProjectController.deleteChefProject);

module.exports = router;
