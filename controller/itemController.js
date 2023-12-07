const db = require("../model");
const Item = db.item;


exports.addItem = async (req, res) => {
    try {
        const items = req.body;

        console.log('Received Items:', items);
        if (!Array.isArray(items)) {
            return res.status(400).json({ error: 'Invalid input. Expected an array of items.' });
        }

        const createdItems = await Promise.all(items.map(item => Item.create(item)));

        res.status(200).json(createdItems);
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