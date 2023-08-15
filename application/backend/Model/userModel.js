const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userInfoSchema = new Schema(
  {
    username: String,
    token: String,
    password: String,
    email: String,
    location: String,
    searchHistory: [String],
    queryHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Query",
      },
    ],
    userDescription: {
      age: Number,
      gender: String,
      preferredLanguage: String,
      favoriteHashtags: [String],
      preferredTravelMethods: [String],
      preferredCuisine: [String],
      preferredActivities: [String],
      aboutMe: String,
    },
    schedules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
  },
  { collection: "userInfo" }
);

userInfoSchema.pre("save", (next) => {
  if (this.schedules > 5) {
    return next(new Error("Too many queries are stored. Max is 5"));
  }
  next();
});

userInfoSchema.pre("save", (next) => {
  if (this.queryHistory > 5) {
    return next(new Error("Too many queries are stored. Max is 5"));
  }
  next();
});

const userInfo = mongoose.model("userInfo", userInfoSchema);

module.exports = userInfo;
