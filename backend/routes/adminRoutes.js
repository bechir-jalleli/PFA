const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
//const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.get('/', adminController.getAllAdmins);

//router.use(verifyToken);
 //router.use(checkRole('admin'));

router.get('/:id', adminController.getAdminById);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
