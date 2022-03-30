const {Schema} = require('mongoose')

const ingredientSchema = new Schema({
    food:{
        type: String,
        required:true
    },
    // quantity:Number,
    // measure:String,
})

module.exports = ingredientSchema