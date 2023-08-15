const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database running on port 27017.");
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  connectToDB,
};
