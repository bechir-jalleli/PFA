const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/refresh', adminController.refresh);
router.post('/logout', adminController.logout);

//router.use(verifyToken);
//router.use(checkRole('admin'));

router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
