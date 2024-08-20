const express = require('express');
const router = express.Router();
const sousOrganisationController = require('../controllers/sousOrganisationController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');
/*
router.use(verifyToken);
router.use(checkRole('admin'));
*/
router.post('/', sousOrganisationController.createSousOrganisation);
router.get('/', sousOrganisationController.getAllSousOrganisations);
router.get('/:id', sousOrganisationController.getSousOrganisationById);
router.put('/:id', sousOrganisationController.updateSousOrganisation);
router.delete('/:id', sousOrganisationController.deleteSousOrganisation);

module.exports = router;
