const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    });

    console.log(
        `MongoDB connected ${conn.connection.host}`.brightBlue.bold.underline
    );
};

module.exports = connectDB;
