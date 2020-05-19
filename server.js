const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3033


const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
  db.Workouts.find()
    .then(data => {
      res.json(data);
    });
});


app.put("/api/workouts/:id", (req, res) => {

  db.Workouts.update({ _id: req.params.id }, { $push: { exercises: req.body } })
    .then(data => {
      res.json(data);
    });
});

app.post("/api/workouts", (req, res) => {
  db.Workouts.create(req.body)
    .then(data => {
      res.json(data);
    });
});

app.get("/api/workouts/:range", (req, res) => {
  db.Workouts.find()
    .then(data => {
      res.json(data);
    });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});