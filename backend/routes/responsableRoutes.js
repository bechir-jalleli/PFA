const express = require('express');
const router = express.Router();
const responsableController = require('../controllers/responsableController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');
router.use(verifyToken);
router.use(checkRole('admin'));

router.post('/', responsableController.createResponsable);
router.get('/', responsableController.getAllResponsables);

router.use(checkRole('admin', 'responsable'));

router.get('/:id', responsableController.getResponsableById);
router.put('/:id', responsableController.updateResponsable);
router.delete('/:id', responsableController.deleteResponsable);

module.exports = router;
