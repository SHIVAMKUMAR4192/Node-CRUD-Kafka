const itemController = require('../controller/itemController');
const kafkaControllers = require('../controller/kafkaController');
const router = require('express').Router();
const authController = require('../controller/authController');
const authenticateToken = require('../middleware/authMiddleware')



router.post('/addItem', authenticateToken,itemController.addItem)
router.get('/allItem', authenticateToken,itemController.getAllItems)
router.get('/item/:id', authenticateToken,itemController.getOneItems)
router.put('/:id', authenticateToken,itemController.updateItem)
router.delete('/:id', authenticateToken,itemController.deleteItem)
router.post("/kafka/send", kafkaControllers.sendMessageToKafka);

router.put('/:id', authenticateToken, itemController.updateItem);
router.delete('/:id', authenticateToken, itemController.deleteItem);

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await authController.authenticateUser(username, password);

  if (user) {
    const token = authController.generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


module.exports = router;