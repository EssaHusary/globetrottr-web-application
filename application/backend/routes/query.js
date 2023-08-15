const express = require("express");
const queryController = require("../Controller/queryController");

const router = express.Router();

router.post("/getUserQueries", (req, res) => {
  const user_id = req.body._id;

  try {
    queryController.getUserQueries(user_id)
    .then(userQueries => {
      res.status(200).send(userQueries);
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.patch("/add", (req, res) => {
  const user_id = req.body._id;
  
  try {
    queryController.addQuery(user_id, req.body.query)
    .then(query => {
      res.status(200).send(query);
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/search", (req, res) => {
  const user_id = req.body._id;
  const search = req.body.search;
  
  try {
    queryController.search(user_id, search)
    .then(results => {
      res.status(200).json(results);
    })
  } catch (error) {
    console.log(error);
    res.status(500);
  }
})

module.exports = router;