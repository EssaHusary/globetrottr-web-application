const createServer = require("../../server");
const request = require("supertest");
const mongoose = require("mongoose");

const User = require("../../Model/userModel.js");

const errors = require("../../errors");

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

const app = createServer();

// credentials used for testing sign-up and log-in
const testUser = {
  username: "testingUserJest",
  password: "thisisatest",
};

// id of user after it is signed up in DB; used in log in test
let userIdInDB;

describe("POST /signup", () => {
  test("POST /signup (200, Success)", async () => {
    await request(app)
      .post("/user/signup")
      .send(testUser)
      .expect(200)
      .then(async (response) => {
        const { _id, username, password } = response.body;
        
        // check response
        expect(_id).toBeTruthy();
        expect(username).toBe(testUser.username);
        expect(password).toBe("");

        // check data in database
        const user = await User.findOne({ _id: _id });
        expect(user).toBeTruthy();
        expect(user.username).toBe(testUser.username);
        expect(user.password).toBe(testUser.password);

        // save the id for login test
        userIdInDB = _id;
      })
  });

  test("POST /signup (400, User Exists)", async () => {
    await request(app)
      .post("/user/signup")
      .send(testUser)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe((new errors.UserExists).message);
      });
  });

  test("POST /signup (400, Insufficient Credentials)", async () => {
    await request(app)
      .post("/user/signup")
      .send({
        username: "testing",
      })
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe((new errors.InsufficientCredentials).message);
      });
  });
});

describe("POST /login", () => {
  test("POST /login (400, Insufficient Credentials)", async () => {
    await request(app)
      .post("/user/login")
      .send({
        username: "testing",
      })
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe((new errors.InsufficientCredentials).message);
      });
  });

  test("POST /login (400, User not Found)", async () => {
    await request(app)
      .post("/user/login")
      .send({
        username: "woivjweoifjwifjewkvndlvjkewjflewfjewfwe",
        password: "testing"
      })
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe((new errors.UserNotFound).message);
      });
  });

  test("POST /login (401, Invalid Credentials)", async () => {
    await request(app)
      .post("/user/login")
      .send({
        username: "testingUserJest",
        password: "wrongpassword"
      })
      .expect(401)
      .then(response => {
        expect(response.body.message).toBe((new errors.InvalidCredentials).message);
      });
  });

  test("POST /login (200, Success)", async () => {
    await request(app)
      .post("/user/login")
      .send(testUser)
      .expect(200)
      .then(async (response) => {
        const { _id, username, password } = response.body;
        
        // check response
        expect(_id).toBe(userIdInDB);
        expect(username).toBe(testUser.username);
        expect(password).toBe("");

        // delete the record afterwards
        await User.deleteOne({ _id: userIdInDB });
      });
  });
}); 