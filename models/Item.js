const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const item = new Schema({
    title: {
        required: true,
        type: String
    },
    des: {
        required:true,
        type:String
    },
    img: {
        type:String
    },
    price: {
        required:true,
        type:Number,
        min: 20
    },
    type: {
        required:true,
        type:String
    },
    options: [
        {
            title: {
                type:String,
            },
            value: {
                type:String,
            }
        }
    ]

},{timestamps:true})
const Item = mongoose.model("Item", item)
module.exports = Item;