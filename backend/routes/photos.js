const express = require("express");

const PhotosController = require("../controllers/photos");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, PhotosController.addPhoto);

router.get("", PhotosController.getPhotos);

module.exports = router;
