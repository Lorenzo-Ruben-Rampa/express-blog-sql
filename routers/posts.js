// importiamo express e usiamo il routing
const express = require('express')
const router = express.Router();

// Importiamo le funzioni del controller
const postController = require('../controllers/postsController');

// Rotte CRUD
// index
router.get('/', postController.index);

// show
router.get('/:id', postController.show);

//store
router.post('/', postController.store);

//update
router.put('/:id', postController.update);

//modify
router.patch('/:id', postController.modify);

//destroy
router.delete('/:id', postController.destroy);

//Esporto
module.exports = router;