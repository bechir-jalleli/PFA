const express = require('express');
const router = express.Router();
const tacheController = require('../controllers/tacheController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');
/*
router.use(verifyToken);
*/
router.get('/', tacheController.getAllTaches);
router.get('/:id', tacheController.getTacheById);


router.post('/',/* checkRole('chefProject'),*/tacheController.createTache);
router.put('/:id',/*  checkRole('chefProject'), */tacheController.updateTache);
router.delete('/:id',/* checkRole('chefProject'),*/tacheController.deleteTache);

module.exports = router;
