const createServer = require("../../server");
const request = require("supertest");
const mongoose = require("mongoose");

const User = require("../../Model/userModel.js");
const Schedule = require("../../Model/scheduleModel");

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

const app = createServer();

describe("schedule routes", () => {
  const testUser = {
    username: "scheduleTestingUserJest",
    password: "thisisatest",
  };

  const testSchedule = {
    destination: "Los Angeles",
    totalCost: 5000,
    averageMidpointRating: 3.2,
    numberOfMidpoints: 5,
    overallRating: 2.3,
    totalTravelTime: 520,
    events: [
      {
        startDate: "3/5/2020",
        endDate: "3/6/2020",
        midpoint: {
          contactInformation: "N/A",
          hashtags: ["exciting", "fun"],
          location: [23, 2.32],
          name: "Cool Name",
          quickKnowledge: ["safe", "great service"],
          rating: 3.2,
          midpointType: "Explore",
        },
      }
    ],
    routes: [
      {
        startDate: "3/5/2020",
        endDate: "3/5/2020",
        travelDistance: 2.3,
        travelDuration: 3,
        travelMean: "Driving",
      },
    ],
    party: ["personOne", "personTwo"],
    partySize: 2,
    userRating: 3.5,
    sharedWith: [],
    startDate: "3/5/2020",
    endDate: "3/8/2020",
  };

  test("POST /generate", async () => {
    const numberOfSchedules = 5;

    await request(app)
      .post("/schedule/generate")
      .send({
        "scheduleForm": {
          city: "Los Angeles",
          country: "United States",
          numberOfSchedules: numberOfSchedules,
          startDate: "05/25/2023",
          endDate: "06/09/2023",
          budget: "9200",
          partySize: 2
        }
      })
      .expect(200)
      .then(async response => {
        // check that the response has the requested number of schedules
        expect(response.body.length).toBe(numberOfSchedules);
      });
  }, 10000);

  test("POST /getUserSchedules", async () => {
    let schedules = [];
    
    // create an array of test schedules
    for (let i = 0; i < 5; i++) {
      const schedule = await Schedule.create(testSchedule);
      schedules.push(schedule);
    }

    testUser["schedules"] = schedules;
    const user = await User.create(testUser);

    await request(app)
      .post("/schedule/getUserSchedules")
      .send({
        "_id": user._id
      })
      .expect(200)
      .then(async response => {
        // check that the response has the appropriate number of schedules
        expect(response.body.length).toBe(schedules.length);

        // delete the user and queries
        await User.deleteOne({ _id: user._id });
        for (let i = 0; i < 5; i++) {
          await Schedule.deleteOne({ "_id": schedules[i] });
        }
      });
  });

  test("PATCH /add", async () => {
    const user = await User.create(testUser);

    await request(app)
      .patch("/schedule/add")
      .send({
        "_id": user._id,
        "schedule": testSchedule,
      })
      .expect(200)
      .then(async response => {
        const {
          _id,
          destination,
          totalCost,
          averageMidpointRating,
          numberOfMidpoints,
          overallRating,
          totalTravelTime,
          events,
          routes,
          party,
          partySize,
          userRating,
          sharedWith,
          startDate,
          endDate,
        } = response.body;
    
        // check response 
        expect(_id).toBeTruthy();
        expect(destination).toBe(testSchedule.destination);
        expect(totalCost).toBe(testSchedule.totalCost);
        expect(averageMidpointRating).toBe(testSchedule.averageMidpointRating);
        expect(numberOfMidpoints).toBe(testSchedule.numberOfMidpoints);
        expect(overallRating).toBe(testSchedule.overallRating);
        expect(totalTravelTime).toBe(testSchedule.totalTravelTime);
        expect(events).toMatchObject(testSchedule.events);
        expect(routes).toMatchObject(testSchedule.routes);
        expect(party).toMatchObject(testSchedule.party);
        expect(partySize).toBe(testSchedule.partySize);
        expect(userRating).toBe(testSchedule.userRating);
        expect(sharedWith).toMatchObject(testSchedule.sharedWith);
        expect(startDate).toBe(testSchedule.startDate);
        expect(endDate).toBe(testSchedule.endDate);
        
        // check data in database

        // check that schedule collection contains this new schedule
        const schedule = await Schedule.findOne({ _id: _id });
        expect(schedule._id).toBeTruthy();
        expect(schedule.destination).toBe(testSchedule.destination);
        expect(schedule.totalCost).toBe(testSchedule.totalCost);
        expect(schedule.averageMidpointRating).toBe(testSchedule.averageMidpointRating);
        expect(schedule.numberOfMidpoints).toBe(testSchedule.numberOfMidpoints);
        expect(schedule.overallRating).toBe(testSchedule.overallRating);
        expect(schedule.totalTravelTime).toBe(testSchedule.totalTravelTime);
        expect(schedule.events).toMatchObject(testSchedule.events);
        expect(schedule.routes).toMatchObject(testSchedule.routes);
        expect(schedule.party).toMatchObject(testSchedule.party);
        expect(schedule.partySize).toBe(testSchedule.partySize);
        expect(schedule.userRating).toBe(testSchedule.userRating);
        expect(schedule.sharedWith).toMatchObject(testSchedule.sharedWith);
        expect(schedule.startDate).toBe(testSchedule.startDate);
        expect(schedule.endDate).toBe(testSchedule.endDate);

        // check that the user's schedules array contains this new schedule
        await User.findOne({ _id: user._id })
        .then(user => {
          expect(user.schedules).toContainEqual(schedule._id);
        });
        
        // delete the user and schedule
        await User.deleteOne({ _id: user._id });
        await Schedule.deleteOne({ _id: _id });
      });
  });
  
  test("PATCH /remove", async () => {
    const user = await User.create(testUser);
    const dummySchedule = await Schedule.create(testSchedule);

    // add the dummySchedule to the user's schedules array
    user.schedules.push(dummySchedule);
    user.save();

    const numberOfUserSchedules = user.schedules.length;

    await request(app)
      .patch("/schedule/remove")
      .send({
        "_id": user._id,
        "schedule": dummySchedule,
      })
      .expect(200)
      .then(async response => {
        const {
          _id,
          schedules,
        } = response.body;

        // check response
        expect(_id).toBeTruthy();
        expect(schedules.length).toBe(numberOfUserSchedules - 1);

        // check database

        // check that schedule collection doesn't contain this schedule
        const countOfSchedule = await Schedule.countDocuments({ _id: dummySchedule._id });
        expect(countOfSchedule).toBe(0);

        // check that user's schedules array doesn't contains this new schedule
        await User.findOne({ _id: _id })
        .then(user => {
          expect(user.schedules).not.toContainEqual(dummySchedule._id);
        });
      });

    // delete the user and schedule
    await User.deleteOne({ _id: user._id });
    await Schedule.deleteOne({ _id: dummySchedule._id });
  });
});