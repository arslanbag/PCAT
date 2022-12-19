const Photo = require('../models/Photo')

exports.getAboutPage = (req, res) =>
{
   res.render('about')
}

exports.getPhotoEditPage = async (req, res) =>
{
   const photo = await Photo.findOne({_id:req.params.id})
   res.render('edit', {photo})
}

exports.getPhotoAddPage = (req, res) =>
{
   res.render('add')
   
}