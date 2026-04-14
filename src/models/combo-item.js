const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const ComboItem=sequelize.define("comboItem",{
    id:{
        type: Sequelize.INTEGER, 
        primaryKey:true,
        allowNull:false
    },
   quantity:{
           type:Sequelize.INTEGER
       }

})
module.exports=ComboItem