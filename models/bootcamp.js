const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const bootCampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `name is required`],
        unique: true,
        trim: true,
        maxlenght: [50, `maxlength === 50 characters`]
    },
    slug: String,
    description: {
        type: String,
        required: [true, `name is required`],
        maxlenght: [500, `maxlength === 50 characters`]
    },
    website: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    careers: {
        type: [String]
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    averageCost: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("bootCampModel", bootCampSchema);
