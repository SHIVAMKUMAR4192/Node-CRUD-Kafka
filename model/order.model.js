const { DataTypes } = require('sequelize');
const { sequelize } = require('.');

module.exports=(sequelize) =>{
    const order = sequelize.define("order",{
        orderNumber:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    });
    return order;
};