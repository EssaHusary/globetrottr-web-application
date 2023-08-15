const express = require("express");
const scheduleController = require("../Controller/scheduleController");

const router = express.Router();

/*
 * Author: Jay
 * Generates schedules from APIs based on request parameters.
*/
router.post("/generate", async (req, res) => {
  try {
    const arrayOfSchedules = await scheduleController.
        generateSchedules(req.body.scheduleForm);
    res.status(200).json(arrayOfSchedules);
  } catch (error) {
    res.status(500).json({ error: error.message }).send();
  }
});

/* Authors: Justin & Jay
 * Called by frontend when the user wants to add a schedule to their 
 *     collection; finds the user in the UserInfo collection, creates the 
 *         schedule document in the schedules collection, and saves the ID of 
 *             the schedule into the user's schedule array.
 */
router.patch("/add", (req, res) => {
  const user_id = req.body._id;
  const scheduleToAdd = req.body.schedule;

  try {
    scheduleController.addSchedule(user_id, scheduleToAdd)
    .then(schedule => {
      res.status(200).send(schedule);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message }).send();
  }
});

/* Author: Jay
 * Removes a schedule from a user's schedule array.
 */
router.patch("/remove", (req, res) => {
  const user_id = req.body._id;
  const scheduleToRemove = req.body.schedule;

  //  finds the user and updates their schedule array by deleting the
  //  schedule specified in the body of the request

  try {
    scheduleController.removeSchedule(user_id, scheduleToRemove)
    .then(user => {
      res.status(200).send(user);
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message }).send();
  }
});

router.post("/getUserSchedules", async (req, res) => {
  const user_id = req.body._id;

  try {
    scheduleController.getUserSchedules(user_id)
    .then(userSchedules => {
      res.status(200).json(userSchedules);
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message }).send();
  }
});

module.exports = router;