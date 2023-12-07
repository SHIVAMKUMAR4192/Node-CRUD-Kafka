const itemController = require('../controller/itemController');

const router = require('express').Router();

router.post('/addItem', itemController.addItem)
router.get('/allItem', itemController.getAllItems)
router.get('/item/:id', itemController.getOneItems)
router.put('/:id', itemController.updateItem)
router.delete('/:id', itemController.deleteItem)


module.exports = router;