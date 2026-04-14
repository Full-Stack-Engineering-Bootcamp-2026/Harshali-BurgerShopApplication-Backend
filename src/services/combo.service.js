const Combo=require('../models/combo')

exports.getAllCombos=()=>{

    return Combo.findAll()
    
}