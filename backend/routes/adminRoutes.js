const express = require('express');
const router = express.Router();
const { getAdmin, updateAdmin, createAdmin,getInfo } = require('../controllers/adminController');

router.get('/info', getInfo); 
router.get('/:id', getAdmin);
router.put('/:id', updateAdmin);
router.post('/', createAdmin);
module.exports = router;
