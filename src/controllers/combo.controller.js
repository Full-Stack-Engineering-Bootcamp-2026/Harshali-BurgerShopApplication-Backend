const comboService=require('../services/combo.service')

const getCombos=(req,res) =>{
    
    comboService.getAllCombos()
    .then((combos)=>{
        res.json(combos)
    })
    .catch((err)=>{
        res.status(500).json({message: err.message})
    })
}
module.exports={getCombos}