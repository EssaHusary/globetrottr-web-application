const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  destination: {
    type: String,
    required: true,
  },
  totalCost: Number,
  averageMidpointRating: Number,
  numberOfMidpoints: Number,
  overallRating: Number,
  totalTravelTime: Number,
  events: [
    {
      startDate: String,
      endDate: String,
      midpoint: {
        contactInformation: String,
        hashtags: [String],
        location: [Number, Number],
        name: String,
        quickKnowledge: [String],
        rating: Number,
        midpointType: String,
      },
    }
  ],
  routes: [
    {
      startDate: String,
      endDate: String,
      travelDistance: Number,
      travelDuration: Number,
      travelMean: String,
    },
  ],
  party: [String],
  partySize: Number,
  userRating: Number,
  sharedWith: [
    {
      userId: String,
      permission: String,
    },
  ],
  startDate: String,
  endDate: String,
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
