const express = require("express");

const ChallengeController = require("../controllers/challenge");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, ChallengeController.addChallenge);

router.get("", checkAuth, ChallengeController.getChallenge);

router.put("/:id", checkAuth, ChallengeController.updateChallenge);

router.delete("/:id", checkAuth, ChallengeController.deleteChallenge);

module.exports = router;
