const express = require("express");

const WishlistController = require("../controllers/wishlist");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, WishlistController.addWishList);

router.get("", checkAuth, WishlistController.getWishlist);

router.put("/:id", checkAuth, WishlistController.updateWishlist);

router.patch("/:id", checkAuth, WishlistController.updateVisited);

router.delete("/:id", checkAuth, WishlistController.deleteWishlist);

module.exports = router;
