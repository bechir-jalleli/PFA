const express = require('express');
const router = express.Router();
const organisationController = require('../controllers/organisationController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

//router.use(verifyToken);

router.post('/',/* checkRole('admin'),*/ organisationController.createOrganisation);
router.get('/',/* checkRole('admin', 'responsable'),*/ organisationController.getAllOrganisations);
router.get('/:id',/* checkRole('admin', 'responsable'),*/ organisationController.getOrganisationById);
router.put('/:id',/* checkRole('admin'),*/ organisationController.updateOrganisation);
router.delete('/:id',/* checkRole('admin'),*/ organisationController.deleteOrganisation);

module.exports = router;
