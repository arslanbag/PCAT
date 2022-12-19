const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Connect Db
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db')

//Create Schema 
const PhotoSchema = new Schema({
    title : String,
    description : String
})

//Create Model 
const Photo = mongoose.model('Photo', PhotoSchema)

/**** 
//Create a Photo
Photo.create({
    title: 'Photo Title 1',
    description: 'Photo description 1 lorem ipsum'
})

//Read a Photo
Photo.find({},(err,data) => {
    console.log(data)
})


//Update a Photo
const id = "639f36d82ef217fc77a0ea89"
Photo.findByIdAndUpdate(
    id, {
        title:"Photo Title 1 Updated2 ",
        description: 'Photo description Updated2'
    }
,{ 
    new: true
}
,(err, data) =>{
    console.log(data)
})

//Delete a Photo
const id = "639f36d82ef217fc77a0ea89"
Photo.findByIdAndDelete(
    id, (err, data) =>{
    console.log('Photo is removed...')
})
***/