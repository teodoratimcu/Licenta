const Wishlist = require("../models/wishlist");

exports.addWishList = (req, res, next) => {
  const wishlist = new Wishlist({
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    who: req.body.who,
    visited: false,
    creator: req.userData.userId
  });
  wishlist
    .save()
    .then(createdWishlist => {
      res.status(201).json({
        message: "Wishlist added successfully!",
        wishlist: {
          ...createdWishlist,
          id: createdWishlist._id
        }
      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Creating a wishlist failed!"
      });
    });
}

exports.getWishlist = (req, res, next) => {
  const wishlistQuery = Wishlist.find({creator: req.userData.userId});
  let fetchedWishlist;
  wishlistQuery
    .then(wishlist => {
      fetchedWishlist = wishlist;
    })
    .then( () => {
      res.status(200).json({
        message: "Wishlist fetched successfully!",
        wishlist: fetchedWishlist
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching wishlist failed!"
      });
    });
}

exports.updateWishlist = (req, res, next) => {
  const wishlist = new Wishlist({
    _id: req.body.id,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    who: req.body.who,
    visited: false,
    creator: req.userData.userId
  });
  Wishlist.updateOne({ _id: req.params.id, creator: req.userData.userId }, wishlist)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update wishlist!"
      });
    });
};

exports.updateVisited = (req, res, next) => {
console.log(req.body);
  Wishlist.update({ _id: req.params.id, creator: req.userData.userId }, {$set: {visited: req.body.visited}})
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Couldn't update visited!"
      });
    });
};


exports.deleteWishlist = (req, res, next) => {
  Wishlist.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting wishlist failed!"
      });
    });
};
