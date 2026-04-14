const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const Product=sequelize.define("product",{
    id:{
        type: Sequelize.INTEGER, 
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name: Sequelize.STRING,
    price:{
            type:Sequelize.INTEGER
        },

    category:Sequelize.STRING,

    type:Sequelize.STRING,
    
    image:Sequelize.STRING


})
module.exports=Product