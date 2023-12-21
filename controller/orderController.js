const { v4: uuidv4 } = require('uuid');
const db = require('../model');
const Order = db.order;

exports.addOrder = async (req, res) => {
    try {
        const { orderNumber, itemId } = req.body;
        console.log('Received Order Data:', { orderNumber, itemId });

        if (!orderNumber || !itemId) {
            return res.status(400).json({ error: 'Invalid input. Both orderNumber and itemId are required.' });
        }

        const order = await Order.create({ orderNumber, itemId });

        res.status(201).json({ message: 'Order added successfully', orderId: order.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
