const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.use(verifyToken);

router.get('/',checkRole('responsable','admin'), projectController.getAllProjects);
router.get('/:id',checkRole('responsable','admin'), projectController.getProjectById);

router.post('/', checkRole('responsable'),projectController.createProject);
router.put('/:id',checkRole('responsable'),projectController.updateProject);
router.delete('/:id',checkRole('responsable'),projectController.deleteProject);

module.exports = router;
