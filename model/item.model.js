const { DataTypes } = require('sequelize');
module.exports = (sequelize) =>{
    const Item = sequelize.define("item", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT
          },
          price:{
            type:DataTypes.INTEGER
          },
    });
    return Item;
};