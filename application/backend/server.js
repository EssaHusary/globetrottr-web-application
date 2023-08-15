const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const {
  scheduleRoutes,
  queryRoutes,
  userRoutes,
} = require("./routes/index");

function createServer() {
  const app = express();

  // whitelist certain list of domains that can request from this server
  const whitelist = [
    "http://34.69.31.185",
    "https://globetrottr.org",
    "https://www.globetrottr.org",
    "http://localhost:3000",
  ];
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };

  // middleware
  app.use(cors(corsOptions));
  app.use(helmet()); // helmet used for security
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // routes
  app.use("/schedule", scheduleRoutes);
  app.use("/query", queryRoutes);
  app.use("/user", userRoutes);

  return app;
}

module.exports = createServer;