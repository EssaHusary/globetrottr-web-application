const Schedule = require("../Model/scheduleModel");
const UserInfo = require("../Model/userModel");

const countryList = require("../country_conversions");

const getUserSchedules = (user_id) => { 
  return UserInfo.findById(user_id)
    .then(async user => {
      if (!user) {
        throw new Error("User not found");
      }

      return Schedule.find({ _id: { $in: user.schedules } })
      .then(schedules => {
        return schedules;
      });
    })
    .catch(error => {
      throw new Error(error);
    });
};

const addSchedule = (user_id, scheduleToAdd) => {
  //  find the user with the id specified in the request
  return UserInfo.findById(user_id)
    .then(user => {
      if (!user) {
        throw new Error("User not found");
      }
      //  create the schedule document in the schedules collection
      return new Schedule(scheduleToAdd)
      .save()
      .then(schedule => {
        //  add the ID of the schedule into the user's schedules array
        user.schedules.push(schedule);
        user.save()
        return schedule;
      })
    .catch(error => {
      throw new Error(error);
    });
  });
};

const removeSchedule = (user_id, scheduleToRemove) => {
  //  finds the user and updates their schedule array by deleting the
  //  schedule specified in the body of the request
  return UserInfo.findOneAndUpdate(
    { _id: user_id },
    { $pull: { schedules: scheduleToRemove._id } },
    { returnOriginal: false })
    .then(async (user) => {
      // delete the schedule from the schedules collection
      await Schedule.deleteOne({ _id: scheduleToRemove._id })
      .catch(error => {
        console.log(error);
      });

      return user;
    })
    .catch(error => {
      throw new Error(error);
    });
};

const getLatitudeAndLongitudeArray = async (city, country) => {
  //  find latitude and longitude of city

  // get country code of country
  const countryCode = countryList[country];
  
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
    {
      method: "GET",
    }
  );
  
  const jsonData = await response.json();
  return jsonData;
};

const getPointsOfInterest = async (latitude, longitude) => {
  const openTripMapResponse = await fetch(
    `http://api.opentripmap.com/0.1/en/places/radius?apikey=${process.env.OPENTRIPMAP_API_KEY}&lon=${longitude}&lat=${latitude}&radius=80000&rate=1&limit=50`,
    {
      method: "GET",
    }
  );
  const openTripMapData = await openTripMapResponse.json();
  const pointsOfInterest = openTripMapData.features;

  return pointsOfInterest;
};

const getArrayOfSchedules = async (
  scheduleForm,
  numberOfPOIsInASchedule,
  pointsOfInterest
) => {
  var arrayOfSchedules = [];

  for (let i = 0; i < scheduleForm.numberOfSchedules; i++) {
    //  attributes that the schedule will have
    var totalTravelTime = 0;
    var totalMidpointRating = 0;
    var totalTravelDistance = 0;
    var events = [];
    var routes = [];

    for (let j = 0; j < numberOfPOIsInASchedule; j++) {
      const pointOfInterest = pointsOfInterest[i * numberOfPOIsInASchedule + j];

      totalMidpointRating += pointOfInterest.properties.rate;

      const event = {
        midpoint: {
          midpointType: "miscellaneous",
          name: pointOfInterest.properties.name,
          location: pointOfInterest.geometry.coordinates,
          rating: pointOfInterest.properties.rate,
          hashtags: [pointOfInterest.properties.kinds],
          contactInformation: "N/A",
          quickKnowledge: ["N/A"],
        },
        startDate: "N/A",
        endDate: "N/A",
      };

      events.push(event);

      //  if not last POI in schedule, add to schedule the route betwen it and 
      //      next POI
      if (j != numberOfPOIsInASchedule - 1) {
        const currentPOI = pointsOfInterest[i * numberOfPOIsInASchedule + j];
        const nextPOI = pointsOfInterest[i * numberOfPOIsInASchedule + j + 1];

        const currentPOILongitude = currentPOI.geometry.coordinates[0];
        const currentPOILatitude = currentPOI.geometry.coordinates[1];

        const nextPOILongitude = nextPOI.geometry.coordinates[0];
        const nextPOILatitude = nextPOI.geometry.coordinates[1];

        const bingMapResponse = await fetch(
          `http://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=${currentPOILatitude},${currentPOILongitude}&wp.1=${nextPOILatitude},${nextPOILongitude}&key=${process.env.BINGMAP_API_KEY}`,
          {
            method: "GET",
          }
        );
        const bingMapData = await bingMapResponse.json();

        const routeInformation =
          bingMapData.resourceSets[0].resources[0].routeLegs[0];
        const route = {
          travelMean: "Driving",
          travelDuration: routeInformation.travelDuration,
          travelDistance: routeInformation.travelDistance,
          startDate: "N/A",
          endDate: "N/A",
        };

        totalTravelTime += route["travelDuration"];
        totalTravelDistance += route["travelDistance"];

        routes.push(route);
      }
    }

    const schedule = {
      destination: scheduleForm.city + ", " + scheduleForm.country,
      totalCost: scheduleForm.budget,
      averageMidpointRating: totalMidpointRating / numberOfPOIsInASchedule,
      numberOfMidpoints: numberOfPOIsInASchedule,
      overallRating:
        totalMidpointRating / numberOfPOIsInASchedule +
        totalTravelTime +
        totalTravelDistance,
      totalTravelTime: totalTravelTime,
      events: events,
      routes: routes,
      party: [],
      partySize: scheduleForm.partySize,
      userRating: 3,
      sharedWith: [],
      startDate: scheduleForm.startDate,
      endDate: scheduleForm.endDate,
    };

    arrayOfSchedules.push(schedule);
  }

  return arrayOfSchedules;
};

const generateSchedules = async (scheduleForm) => {
  const { city, country } = scheduleForm;

  //  get latitude and longitude of city
  const jsonData = await getLatitudeAndLongitudeArray(city, country);
  if (jsonData.length === 0) {
    throw new Error("Invalid city and country.");
  }
  const latitude = jsonData[0].lat;
  const longitude = jsonData[0].lon;

  //  get POIs in requested city
  const pointsOfInterest = await getPointsOfInterest(latitude, longitude);
  if (pointsOfInterest.length === 0) {
    throw new Error("No POIs found in specified city.");
  }

  //  create and send back to frontend an array of schedules
  const numberOfPOIsInASchedule = 5;
  const arrayOfSchedules = await getArrayOfSchedules(
    scheduleForm,
    numberOfPOIsInASchedule,
    pointsOfInterest
  );

  return arrayOfSchedules;
};

module.exports = {
  getUserSchedules,
  addSchedule,
  removeSchedule,
  getLatitudeAndLongitudeArray,
  generateSchedules,
};
