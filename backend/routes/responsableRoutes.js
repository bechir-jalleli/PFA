const express = require('express');
const router = express.Router();
const responsableController = require('../controllers/responsableController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.post('/register', responsableController.register);
router.post('/login', responsableController.login);
router.get('/refresh', responsableController.refresh);
router.post('/logout', responsableController.logout);

//router.use(verifyToken);

router.get('/', /*checkRole('admin', 'responsable'),*/ responsableController.getAllResponsables);
router.get('/:id',/* checkRole('admin', 'responsable'),*/ responsableController.getResponsableById);
router.put('/:id', /*checkRole('admin', 'responsable'),*/ responsableController.updateResponsable);
router.delete('/:id',/* checkRole('admin', 'responsable'),*/ responsableController.deleteResponsable);

module.exports = router;
