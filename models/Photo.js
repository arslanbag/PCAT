const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema 
const PhotoSchema = new Schema({
    title : String,
    description : String,
    image : String,
    dateCreated : {
        type : Date,
        default: Date.now
    }
})

//Create Model 
const Photo = mongoose.model('Photo', PhotoSchema)

//Exports Model
module.exports = Photo