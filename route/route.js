const itemController = require('../controller/itemController');
const kafkaControllers = require('../controller/kafkaController');
const router = require('express').Router();
const authController = require('../controller/authController');
const authenticateToken = require('../middleware/authMiddleware')
const sendMail = require('../controller/sendMailController');
const orderController = require('../controller/orderController');

router.post('/addItem', authenticateToken,itemController.addItem)
router.get('/allItem', authenticateToken,itemController.getAllItems)
router.get('/item/:id', authenticateToken,itemController.getOneItems)
router.put('/:id', authenticateToken,itemController.updateItem)
router.delete('/:id', authenticateToken,itemController.deleteItem)
router.post('/addOrder', authenticateToken,orderController.addOrder)
router.get('/getItemsWithOrders', authenticateToken,itemController.getItemsWithOrders)
router.get('/getRawData', authenticateToken,itemController.getRawData)

router.post('/combinedOrder', authenticateToken,itemController.createCombinedData)
router.post("/kafka/send", kafkaControllers.sendMessageToKafka);

router.put('/:id', authenticateToken, itemController.updateItem);
router.delete('/:id', authenticateToken, itemController.deleteItem);

//this is for jwt token generation
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

//this is for sending a mail
router.post('/sendMail', sendMail);


module.exports = router;