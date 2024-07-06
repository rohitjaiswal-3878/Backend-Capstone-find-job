const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const port = process.env.PORT;
const authRoutes = require("./routes/auth/");

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
  mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
      console.log("Connected to mongoDB.");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Password security
// login
// middleware and loggin
