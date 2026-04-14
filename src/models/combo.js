const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const Combo=sequelize.define("combo", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
            type:Sequelize.INTEGER
        },
    image:Sequelize.STRING


})
module.exports=Combo