const express = require("express");
const router = express.Router();

const {
    getBootCamps,
    getBootCamp,
    createBootCamp,
    createBootCamps
} = require("../controller/bootcamp.js");

router.route("/bootcamp").post(createBootCamp);
router.route("/bootcamps").post(createBootCamps);

router.route("/bootcamp").get(getBootCamps);
// router.route("/").get(getbootcamps).post(<callback>);

router.route("/bootcamp/:id").get(getBootCamp);

module.exports = router;
