const db = require("../model");
const Item = db.item;
const Order = db.order;
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

exports.addItem = async (req, res) => {
    try {
        const items = req.body;
        const correlationId = req.correlationId || uuidv4(); 

        console.log(`Received Items with Correlation ID ${correlationId}:`, items);

        if (!Array.isArray(items)) {
            return res.status(400).json({ error: 'Invalid input. Expected an array of items.' });
        }

        const createdItems = await Promise.all(items.map(item => Item.create(item)));

        try {
            const response = await axios.post('https://rapidapi.com/learn/api/rest', { name:"John Doe" }, {
                headers: {
                    'Correlation-Id': correlationId,
                    'Authorization': req.header('Authorization'),
                },
            });

            console.log(`API Response with Correlation ID ${correlationId}:`, response.data);
        } catch (error) {
            console.error(`API Error with Correlation ID ${correlationId}:`, error.message);
        }

        res.status(200).json({ message: 'Item added successfully', correlationId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllItems = async(req,res) =>{
  let item = await Item.findAll({})
  res.status(200).send(item);

}

exports.getOneItems = async(req,res) =>{
    let id = req.params.id
    let item = await Item.findOne({where :{id:id}})
    res.status(200).send(item);
  
}

exports.updateItem = async(req,res) =>{
    let id = req.params.id
    let info ={
        title:req.body.title,
        description:req.body.description,
        price:req.body.price
    }
    let item = await Item.update(info,{where:{id:id}})
    res.status(200).send(item);
}

exports.deleteItem = async(req,res) =>{
    let id = req.params.id
    let item = await Item.destroy({where:{id:id}})
    res.status(200).send(item,'item deleted successfully');
}


exports.getItemsWithOrders = async (req, res) => {
    try {
        const itemsWithOrders = await db.item.findAll({
            include: [db.order],
        });
        res.status(200).send(itemsWithOrders);
    }catch (err) {
        console.error("error fetching data with joins:",err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getRawData = async (req,res) =>{
    try{
        const rawData = await db.sequelize.query(
            `SELECT * FROM items
            JOIN orders on orders."itemId" = items.id`,
            { type: db.Sequelize.QueryTypes.SELECT }
        );
        
        res.status(200).json(rawData);
    }catch(err){
        console.error("error fetching data with joins:",err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createCombinedData = async (req,res) =>{
    try{
        const {title, description, price, orderNumber } = req.body;

        const cretaedOrder = await Order.create({orderNumber});
        const createdItem = await Item.create({
            title,
            description,
            price,
            orderId: cretaedOrder.id
        });

    }catch(err){
        console.error("error fetching data with joins:",err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}