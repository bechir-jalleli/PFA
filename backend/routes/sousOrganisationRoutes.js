const express = require('express');
const router = express.Router();
const sousOrganisationController = require('../controllers/sousOrganisationController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.use(verifyToken);

router.post('/', checkRole('admin'), sousOrganisationController.createSousOrganisation);
router.get('/', checkRole('admin', 'responsable'), sousOrganisationController.getAllSousOrganisations);
router.get('/:id', checkRole('admin', 'responsable'), sousOrganisationController.getSousOrganisationById);
router.put('/:id', checkRole('admin'), sousOrganisationController.updateSousOrganisation);
router.delete('/:id', checkRole('admin'), sousOrganisationController.deleteSousOrganisation);

module.exports = router;
