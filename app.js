//const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const photoControllers = require('./controllers/photoControllers')
const pageControllers = require('./controllers/pageControllers')
const app = express();
const port = 3000;

//Connect Db
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db')

//Template Engine
app.set("view engine", "ejs")

//Middlewares - Main
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method', {methods : ['POST', 'GET']}))

//Routes**
//CRUD
app.get('/', photoControllers.getAllPhotos)
app.get('/photos/:id', photoControllers.getPhoto)
app.post('/photos', photoControllers.createPhoto )
app.put('/photos/:id', photoControllers.updatePhoto)
app.delete('/delete/:id', photoControllers.deletePhoto)

//PAGE
app.get('/about', pageControllers.getAboutPage)
app.get('/edit/:id', pageControllers.getPhotoEditPage)
app.get('/add', pageControllers.getPhotoAddPage)

//Open Port 
 app.listen(port, () => 
 {
    console.log(`Sunucu ${port} numaralı port ile başlatıldı`);
 })

 /*
 //Middlewares - Logger
const myLogger = (req, res, next) => 
{
    //console.log("Middleware Log 1")
    next();
}
// use
app.use(myLogger)
*/
