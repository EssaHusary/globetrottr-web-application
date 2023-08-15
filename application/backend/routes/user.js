const express = require("express");
const userController = require("../Controller/userController");
const errors = require("../errors");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  userController
    .handleLoginRequest(username, password)
    .then(user => {
      user.password = "";
      res.status(200).json(user);
    })
    .catch((error) => {
      if (error instanceof errors.UserNotFound || 
        error instanceof errors.InsufficientCredentials) {
        res.status(400).json({ message: error.message });
      } 
      else if (error instanceof errors.InvalidCredentials) {
        res.status(401).json({ message: error.message });
      } 
      else {
        res.status(500).json({ message: "Server Error" });
      }
    });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  userController
    .handleSignupRequest(username, password)
    .then(user => {
      user.password = "";
      res.status(200).json(user);
    })
    .catch((error) => {
      if (error instanceof errors.UserExists || 
        error instanceof errors.InsufficientCredentials) {
        res.status(400).json({ message: error.message });
      } 
      else if (error instanceof errors.FailedToCreateUser) {
        res.status(500).json({ message: error.message });
      } 
      else {
        res.status(500).json({ message: "Server Error" });
      }
    });
});

router.post("/getSearchHistory", (req, res) => {
  const user_id = req.body._id;

  userController.getSearchHistory(user_id)
  .then(userSearchTerms => {
    res.status(200).json(userSearchTerms);
  })
  .catch(error => {
    console.log(error);
    res.status(404).json({ message: "Search not found" });
  }) 
})

router.post('/update/credentials', (req, res) => {
  userController.handleUpdateUserCredentialsRequest(
    req.body._id,
    req.body.username,
    req.body.email,
    req.body.password
  )
  .then(() => {
    res.status(200).json({ message: "SUCCESS: Updated user credentials." });
  })
  .catch(error => {
    if (error instanceof errors.UserNotFound) {
      res.status(401).json({ message: error.message })
    }
    else {
      res.status(500).json({ message: "Server Error" });
    }
  });
});

router.post('/update/information', (req, res) => {
  userController.handleUpdateUserInfoRequest(
    req.body._id,
    req.body.userDescription.age,
    req.body.userDescription.gender,
    req.body.userDescription.aboutMe
  )
  .then(() => {
    res.status(200).json({ message: "SUCCESS: Updated user information." });
  })
  .catch((error) => {
    if (error instanceof errors.UserNotFound) {
      res.status(401).json({ message: error.message })
    }
    else {
      res.status(500).json({ message: "Server Error" });
    }
  });
});

router.post('/update/description', (req, res) => {
  userController.handleUpdateUserDescriptionRequest(
    req.body._id,
    req.body.userDescription
  )
  .then(() => {
    res.status(200).json({ message: "SUCCESS: Updated user description." });
  })
  .catch((error) => {
    if (error instanceof errors.UserNotFound) {
      res.status(401).json({ message: error.message })
    }
    else {
      res.status(500).json({ message: `Server Error, ${error.message}` });
    }
  });
});


module.exports = router;
