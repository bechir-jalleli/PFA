const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.use(verifyToken);
router.use(checkRole('responsable','admin','chefProject'));
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

router.post('/',projectController.createProject);
router.put('/:id',projectController.updateProject);
router.delete('/:id',projectController.deleteProject);

module.exports = router;
