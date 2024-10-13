    const express = require('express');
    const router = express.Router();
    const chefProjectController = require('../controllers/chefProjectController');
    const { verifyToken, checkRole } = require('../middleware/authorizationMiddleware');

  router.use(verifyToken);
    router.use(checkRole('responsable', 'chefProject' ,'admin'));
  
    router.get('/',  chefProjectController.getAllChefProjects);


    router.post('/', chefProjectController.createChefProject);
    router.get('/:id', chefProjectController.getChefProjectById);
    router.put('/:id', chefProjectController.updateChefProject);
    router.delete('/:id',chefProjectController.deleteChefProject);

    module.exports = router;
