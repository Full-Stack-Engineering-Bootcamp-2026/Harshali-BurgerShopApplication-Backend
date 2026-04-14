const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const Order=sequelize.define("order",{
    
    orderId:{
        type: Sequelize.INTEGER, 
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name: Sequelize.STRING,
    email:Sequelize.STRING,
    actualAmount:{
        type:Sequelize.INTEGER
    },
    optimizedAmount:{
        type:Sequelize.INTEGER
    },
    appliedCombos:Sequelize.JSON                 //WHICH COMBO APPLIED AND HOW MANY TIMES


})
module.exports=Order