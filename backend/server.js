const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://vaanya-task-frontend.vercel.app",
    ],
  })
);
app.use(express.json());

const port = process.env.PORT;
const uri = process.env.MONGOOSE_URI_CLOUD;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected mongodb at", uri);
  } catch (error) {
    console.error("Error connecting DB:", error);
  }
};

connectDB();

app.use(router);

app.listen(port, () => {
  console.log("Server listening at port", port);
});
