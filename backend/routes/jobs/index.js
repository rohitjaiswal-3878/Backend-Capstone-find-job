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

    const user = req.user;
    const userId = user._id;
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
      userId,
    });
    await job.save();
    res.status(200).send("Job created");
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const defaultJob = await Job.findById(id);
    if (defaultJob.userId.toString() !== userId.toString()) {
      return res.status(403).send("Access Denied!");
    }
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
    const jobs = await Job.find().select("name logo position salary skills"); // Need three fields name, logo, position
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
});

// Updating a job
router.patch("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(403).send("Wrong request");
    }
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
    const userId = req.user._id;
    const defaultJob = await Job.findById(id);
    if (defaultJob.userId.toString() !== userId.toString()) {
      return res.status(403).send("Access Denied!");
    }
    const skillsArray =
      skills?.split(",").map((skill) => skill.trim()) || defaultJob.skills;
    const job = await Job.findByIdAndUpdate(
      id,
      {
        name: name || defaultJob.name,
        logo: logo || defaultJob.logo,
        position: position || defaultJob.position,
        salary: salary || defaultJob.salary,
        jobType: jobType || defaultJob.jobType,
        remote: remote || defaultJob.remote,
        description: description || defaultJob.description,
        about: about || defaultJob.about,
        skills: skillsArray,
        information: information || defaultJob.information,
      },
      {
        new: true, // Return the updated json
      }
    );
    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
});

// Filtering based on skills
router.get("/filter/:skills", async (req, res, next) => {
  try {
    const skills = req.params.skills;
    if (!skills) {
      return res.status(403).send("Wrong request!");
    }
    const skillsArray = skills.split(",").map((skill) => skill.trim()); // filter in an array
    const jobs = await Job.find({ skills: { $in: skillsArray } }).select(
      "name logo position salary skills"
    ); // $in is applying a OR method.
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
});

// Searching based on name, position and job type.

router.get("/search/:query", async (req, res, next) => {
  try {
    const query = req.params.query;
    const job = await Job.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // First matches for this
        { position: { $regex: query, $options: "i" } }, // then this
        { jobType: { $regex: query, $options: "i" } }, // then this
        { description: { $regex: query, $options: "i" } }, // then this
      ],
    }).select("name logo position salary skills");

    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
