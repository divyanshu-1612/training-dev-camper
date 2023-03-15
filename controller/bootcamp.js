// STORES ALL THE CALLBACKS AND FUNCTIONS THAT ARE PASSED INTO ROUTES AS RESPONSES

const mongoose = require("mongoose");
const bootCampModel = require("./../models/bootcamp.js");
const ErrorResponse = require("./../utils/errorResponse");
const asyncHandler = require("./../middleware/async.js");

// @ GET BOOTCAMPS
const getBootCamps = asyncHandler(async (req, res, next) => {
    let queryStr = JSON.stringify(req.query);

    console.log(queryStr);
    queryStr = queryStr.replace(
        /\b(gt|lt|lte|gte|in)\b/g,
        match => `$${match}`
    );

    console.log(queryStr);

    const BootCamps = await bootCampModel.find(JSON.parse(queryStr));

    res
        .status(200)
        .json({ success: true, msg: "Got all bootcamps", data: BootCamps });
});

// @ GET BOOTCAMP
const getBootCamp = async (req, res, next) => {
    try {
        const BootCamp = await bootCampModel.findById(req.params.id);

        res
            .status(200)
            .json({ success: true, msg: "Got bootcamp", data: BootCamp });
    } catch (err) {
        console.log(`Error! ${err}`.red);
        next(
            new ErrorResponse(`No BootCamp with the id ${req.params.id}`, 404)
        );
    }
};

// @ CREATE BOOTCAMP
const createBootCamp = async (req, res, next) => {
    try {
        const createdBootCamp = await bootCampModel.create(req.body);

        res.status(201).send({ success: true, msg: "Created new bootcamp" });
    } catch (err) {
        console.log(`Error! ${err}`);
    }
};

// @ CREATE BOOTCAMPS
const createBootCamps = asyncHandler(async (req, res, next) => {
    const createdBootCamps = await bootCampModel.create(req.body);

    res.status(201).send({ success: true, msg: "Created bootcamps" });
});

// @ DELETE
// @ UPDATE

module.exports = {
    getBootCamps,
    getBootCamp,
    createBootCamp,
    createBootCamps
};

/*

*/
