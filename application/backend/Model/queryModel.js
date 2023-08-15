const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const querySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "userInfo",
    },
    city: String,
    country: String,
    numberOfSchedules: Number,
    budget: Number,
    partySize: Number,
    party: String,
    startDate: String,
    endDate: String,
    hashtags: String,
    travelMeans: String,
    findSavings: Number,
    maxSchedules: Number,
  },
  { collection: "Query" }
);

const Query = mongoose.model("Query", querySchema);

module.exports = Query;
