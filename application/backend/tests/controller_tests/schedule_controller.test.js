const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const mongoose = require("mongoose");

const scheduleController = require("../../Controller/scheduleController");

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("latitude & longitude", () => {
  test("actual city: Los Angeles, United States", async () => {
    await scheduleController.getLatitudeAndLongitudeArray("Los Angeles", "United States")
    .then(response => {
      expect(response.length).toBeGreaterThanOrEqual(1);
      expect(response[0].lat).toBe(34.0536909);
      expect(response[0].lon).toBe(-118.242766);
    });
  });

  test("non-existent city: weoivoweijfoewjfoewf, iovjwoiejfewjfewfoiewf", async () => {
    await scheduleController.getLatitudeAndLongitudeArray("weoivoweijfoewjfoewf", "iovjwoiejfewjfewfoiewf")
    .then(response => {
      expect(response.length).toBe(0);
    });
  });
});
