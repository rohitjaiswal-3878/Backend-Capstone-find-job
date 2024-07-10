const express = require("express");
const router = express.Router();
const Job = require("../../schemas/job.model");

router.post("/create", async (req, res, next) => {
  try {
    const {
      name,
      logo,
      position,
      salary,
      jobType,
      remote,
      description,
      about,
      skills,
      information,
    } = req.body;

    const skillsArray = skills.split(",").map((skill) => skill.trim());

    const job = new Job({
      name,
      logo,
      position,
      salary,
      jobType,
      remote,
      description,
      about,
      skills: skillsArray,
      information,
    });
    await job.save();
    res.status(200).send("Job created");
  } catch (err) {
    next(err);
  }
});

router.post("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(403).send("Wrong request");
    }
    await Job.findByIdAndDelete(id);
    res.status(200).send("Job deleted");
  } catch (err) {
    next(err);
  }
});

router.get("/get/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(403).send("Wrong request");
    }
    const job = await Job.findById(id);
    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const jobs = await Job.find().select("name logo position"); // Need three fields name, logo, position
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
