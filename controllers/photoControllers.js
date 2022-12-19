const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'))
  const page = req.query.page || 1;
  const photosPerPage = 2;
  const length = await Photo.find().countDocuments()
  const photos = await Photo.find({})
   .skip((page - 1) * photosPerPage)
   .limit(photosPerPage)


  res.render('index', {
    photos: photos.sort((a,b) => {return a-b}),
    current: page,
    pages: Math.ceil(length / photosPerPage),
  });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
};

exports.createPhoto = async (req, res) => {
  const uploads = __dirname + '/../public/uploads';

  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).send('No files were uploaded.');

  if (!fs.existsSync(uploads)) fs.mkdirSync(uploads);

  const photo = await Photo.create(req.body);
  const uploadedImage = req.files.image;
  const uploadPath = uploads + '/' + photo.id + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    photo.image = 'uploads/' + photo.id + uploadedImage.name;
    await photo.save();
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  await photo.save();
  res.redirect('/photos/' + req.params.id);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public/' + photo.image;

  if (fs.existsSync(deletedImage)) {
    fs.unlinkSync(deletedImage);
  }

  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
