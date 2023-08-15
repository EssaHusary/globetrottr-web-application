const createServer = require("./server");
const PORT = process.env.PORT || 3001;
const { connectToDB } = require("./Model/db");

//  connect to database
connectToDB();

//  create express app
const app = createServer();

//  make express app listen on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

