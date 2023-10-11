const mongoose = require("mongoose")
const Schema = mongoose.Schema

const config = new Schema({
    types: [
        {
            Type: {
                type: String
            }  
        }
    ]
})

const Config = mongoose.model("Config", config)
module.exports = Config