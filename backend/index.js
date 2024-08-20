// index.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./router/user.js");
const accountRoutes = require("./router/account.js");
const protectedRoutes = require("./router/proctedRoute.js");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/account", accountRoutes);
app.use("/protectedRoutes", protectedRoutes);
app.use("/", (req, res) => {
  res.send("This is home page");
});

async function ConnectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://Dhruv:20150057926@cluster1.dlhme.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
    );
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
}

ConnectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
