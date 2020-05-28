const Photo = require("../models/photos");

exports.addPhoto = (req, res, next) => {
 const url = req.protocol + "://" + req.get("host");
  const photo = new Photo({
    title: req.body.title,
    description: req.body.description,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
});
  photo
    .save()
    .then(createdPhoto => {
      res.status(201).json({
        message: "Photo added successfully",
        post: {
          ...createdPhoto,
          id: createdPhoto._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a photo failed!"
      });
    });

}

exports.getPhotos = (req, res, next) => {
  const photoQuery = Photo.find();
  let fetchedPhotos;
  photoQuery
    .then(photos => {
      fetchedPhotos = photos;
    })
    .then( () => {
      res.status(200).json({
        message: "Photos fetched successfully!",
        photos: fetchedPhotos
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching photos failed!"
      });
    });
}
