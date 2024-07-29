const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.use(verifyToken);

router.post('/', checkRole( 'responsable'), projectController.createProject);
router.get('/', checkRole('admin', 'responsable', 'chefProject'), projectController.getAllProjects);
router.get('/:id', checkRole('admin', 'responsable', 'chefProject'), projectController.getProjectById);
router.put('/:id', checkRole( 'responsable'), projectController.updateProject);
router.delete('/:id', checkRole( 'responsable'), projectController.deleteProject);

module.exports = router;
