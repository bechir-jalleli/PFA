const express = require('express');
const router = express.Router();
const { getAdmin, updateAdmin, createAdmin,getInfo } = require('../controllers/adminController');
const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');
router.get('/info', getInfo); 


router.use(verifyToken);
router.use(checkRole('admin'));
router.post('/', createAdmin);
router.put('/:id', updateAdmin);




router.get('/:id', getAdmin);
module.exports = router;
