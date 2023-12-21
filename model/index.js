const dbConfig = require ("../config/dbConfig");

const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect:dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
      }
})

sequelize.authenticate()
.then(() =>{
    console.log("connected to database")
})
.catch(err =>{
    console.log("Error connecting" + err)
})


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.item = require("./item.model.js")(sequelize, DataTypes);
db.order = require("./order.model.js")(sequelize,DataTypes);


db.order.hasMany(db.item);
db.item.belongsTo(db.order);


db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Models synced with the database.");
    })
    .catch((err) => {
        console.error("Error syncing models with the database:", err);
    });

module.exports = db;
