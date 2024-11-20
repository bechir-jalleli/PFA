const express = require('express');
const router = express.Router();
const organisationController = require('../controllers/organisationController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

 router.use(verifyToken);
router.use(checkRole('admin'));

router.post('/', organisationController.createOrganisation);
router.get('/', organisationController.getAllOrganisations);
router.get('/:id', organisationController.getOrganisationById);
router.put('/:id', organisationController.updateOrganisation);
router.delete('/:id', organisationController.deleteOrganisation);

module.exports = router;
    