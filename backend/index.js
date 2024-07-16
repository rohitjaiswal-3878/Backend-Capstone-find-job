const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const port = process.env.PORT;
const authRoutes = require("./routes/auth/");
const fs = require("fs");
const jobRouter = require("./routes/jobs/");
const authMiddleware = require("./middleware/auth");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());

// log every in coming request.
// store it in a text file.
app.use((req, res, next) => {
  const log = `${req.method} - ${req.url} - ${req.ip} - ${new Date()}`;
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", authMiddleware, jobRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// error handling middleware.
app.use((err, req, res, next) => {
  let log = err.stack;
  log += `/n${req.method} - ${req.url} - ${req.ip} - ${new Date()}`;
  fs.appendFile("error.txt", log, (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.status(500).json({ message: "Serve down!" });
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
