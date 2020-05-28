const Challenge = require("../models/challenge");

exports.addChallenge = (req, res, next) => {
  console.log(req.body.countries);
  const challenge = new Challenge({
    countries: req.body.countries,
    creator: req.userData.userId
  });
  challenge
    .save()
    .then(createdChallenge => {
      res.status(201).json({
        message: "Challenge added successfully!",
        challenge: {
          ...createdChallenge,
          id: createdChallenge._id
        }
      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Creating a challenge failed!"
      });
    });
}

exports.getChallenge = (req, res, next) => {
  const challengeQuery = Challenge.find();
  let fetchedChallenge;
  challengeQuery
    .then(challenges => {
      fetchedChallenge = challenges;
    })
    .then( () => {
      res.status(200).json({
        message: "Challenges fetched successfully!",
        challenges: fetchedChallenge
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching challenges failed!"
      });
    });
}

exports.updateChallenge = (req, res, next) => {
  const challenge = new Challenge({
    _id: req.body.id,
    countries: req.body.countries,
    creator: req.userData.userId
  });
  Challenge.updateOne({ _id: req.params.id, creator: req.userData.userId }, challenge)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update challenge!"
      });
    });
};

exports.deleteChallenge = (req, res, next) => {
  Challenge.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting challenge failed!"
      });
    });
};


