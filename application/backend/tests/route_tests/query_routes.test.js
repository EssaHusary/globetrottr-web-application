const createServer = require("../../server");
const request = require("supertest");
const mongoose = require("mongoose");

const User = require("../../Model/userModel.js");
const Query = require("../../Model/queryModel");
const Schedule = require("../../Model/scheduleModel");

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

const app = createServer();

describe("query routes", () => {
  const testUser = {
    username: "queryTestingUserJest",
    password: "thisisatest",
  };

  const testQuery = {
    city: "testCity",
    country: "testCountry",
    numberOfSchedules: 3,
    budget: 5920,
    partySize: 2,
    startDate: "3/5/2020",
    endDate: "5/9/2020",
  }

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

  test("PATCH /add", async () => {
    const user = await User.create(testUser);

    await request(app)
      .patch("/query/add")
      .send({
        "_id": user._id,
        "query": testQuery,
      })
      .expect(200)
      .then(async response => {
        const {
          _id,
          city,
          country,
          numberOfSchedules,
          budget,
          partySize,
          startDate,
          endDate,
        } = response.body;
        
        // check response
        expect(_id).toBeTruthy();
        expect(city).toBe(testQuery.city);
        expect(country).toBe(testQuery.country);
        expect(numberOfSchedules).toBe(testQuery.numberOfSchedules);
        expect(budget).toBe(testQuery.budget);
        expect(partySize).toBe(testQuery.partySize);
        expect(startDate).toBe(testQuery.startDate);
        expect(endDate).toBe(testQuery.endDate);

        // check data in database
        const query = await Query.findOne({ _id: _id });
        expect(query._id).toBeTruthy();
        expect(query.city).toBe(testQuery.city);
        expect(query.country).toBe(testQuery.country);
        expect(query.numberOfSchedules).toBe(testQuery.numberOfSchedules);
        expect(query.budget).toBe(testQuery.budget);
        expect(query.partySize).toBe(testQuery.partySize);
        expect(query.startDate).toBe(testQuery.startDate);
        expect(query.endDate).toBe(testQuery.endDate);

        // test that user has the query in their queryHistory
        const userInDB = await User.findOne({ _id: user._id });
        expect(userInDB.queryHistory.length).toBe(1);
        expect(query._id).toMatchObject(userInDB.queryHistory[0])

        // delete the user and query
        await User.deleteOne({ _id: user._id });
        await Query.deleteOne({ _id: query._id });
      });
  });

  test("POST /getUserQueries", async () => {
    let queryHistory = [];
    
    for (let i = 0; i < 5; i++) {
      const query = await Query.create(testQuery);
      queryHistory.push(query);
    }

    testUser["queryHistory"] = queryHistory;
    const user = await User.create(testUser);

    await request(app)
      .post("/query/getUserQueries")
      .send({
        "_id": user._id,
      })
      .expect(200)
      .then(async response => {
        // check that the response has the appropriate number of queries
        expect(response.body.length).toBe(queryHistory.length);

        // delete the user and queries
        await User.deleteOne({ _id: user._id });
        for (let i = 0; i < 5; i++) {
          await Query.deleteOne({ _id: queryHistory[i] });
        }
      });
  });
  test("POST /search", async () => {
    const schedArray = [];
    const searchArray = [];
    const search = 'Los Angeles';
    const schedules = await Schedule.create(testSchedule);
    schedArray.push(schedules);
    searchArray.push(search);
    testUser["schedules"] = schedArray;
    testUser["searchHistory"] = searchArray;
    const dbuser = await User.create(testUser);
    const searchNumber = dbuser.searchHistory.length;

    await request(app)
      .post("/query/search")
      .send({
        "_id": dbuser._id,
        "search": search,
      })
      .expect(200)
      .then(async response => {
        const {
          user,
          querySchedules
        } = response.body;
        

        const querySchedNumber = querySchedules.length;
        const userSearchNumber = user.searchHistory.length;
        expect(user.searchHistory[userSearchNumber-1]).toBe(dbuser.searchHistory[searchNumber-1]);
        expect(querySchedules).toHaveLength(querySchedNumber);

      });
      await User.deleteOne({ _id: dbuser._id });
      await Schedule.deleteOne({ _id: schedules._id });
  });
});