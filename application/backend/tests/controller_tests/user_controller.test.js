const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const mongoose = require("mongoose");

const User = require("../../Model/userModel.js");

const userController = require("../../Controller/userController");

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("updateUser", () => {
  const testUser = {
    username: "userControllerTestingUserJest",
    email: "userControllerTesting@gmail.com",
    password: "thisisatest",
  };

  test("update user username", async () => {
    const { _id: user_id } = await User.create(testUser);
    const newUsername = "userControllerTest";

    // update the user's username
    await userController.updateUsername(user_id, newUsername);

    // verify that their username was updated in the DB
    await User.findOne({ _id: user_id })
    .then(user => {
      expect(user.username).toBe(newUsername);
    });

    // delete the user
    await User.deleteOne({ _id: user_id });
  });

  test("update user email", async () => {
    const { _id: user_id } = await User.create(testUser);
    const newEmail = "newEmailOfUser@yahoo.com";

    // update the user's email
    await userController.updateUserEmail(user_id, newEmail);

    // verify that their email was updated in the DB
    await User.findOne({ _id: user_id })
    .then(user => {
      expect(user.email).toBe(newEmail);
    });

    // delete the user
    await User.deleteOne({ _id: user_id });
  });

  test("update user password", async () => {
    const { _id: user_id } = await User.create(testUser);
    const newPassword = "thenewpassword";

    // update the user's password
    await userController.updateUserPassword(user_id, newPassword);

    // verify that their password was updated in the DB
    await User.findOne({ _id: user_id })
    .then(user => {
      expect(user.password).toBe(newPassword);
    });

    // delete the user
    await User.deleteOne({ _id: user_id });
  });

  test("update username, email, and password", async () => {
    const { _id: user_id } = await User.create(testUser);
    const newUsername = "thenewusername";
    const newEmail = "thenewemail";
    const newPassword = "thenewpassword";

    // update the user's attributes
    const result = await userController.updateUser(user_id, newUsername, newEmail, newPassword);
    expect(result).toBe(true);

    // verify that their attributes was updated in the DB
    await User.findOne({ _id: user_id })
    .then(user => {
      expect(user.username).toBe(newUsername);
      expect(user.email).toBe(newEmail);
      expect(user.password).toBe(newPassword);
    });

    // delete the user
    await User.deleteOne({ _id: user_id });
  });
});