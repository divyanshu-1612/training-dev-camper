const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const colors = require("colors");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const errorHandler = require("./middleware/error.js");

// LOAD ENV VARIABLES
dotenv.config({ path: "./config/config.env" });

// CONNECTING MONGODB
connectDB();

// ROUTE FILES
const bootcamps = require("./routes/bootcamp");
const users = require("./routes/auth");

// MIDDLEWARE (EXAMPLE, BODY_PARSER AND COOKIEPARSER)
app.use(logger);
app.use(express.json());
app.use(cookieParser());

// MOUNT ROUTERS
app.use("/api/v1", bootcamps);
app.use("/api/v1/users", users);

// CUSTOM ERROR HANDLER USED AFTER MOUNT ROUTERS
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);

process.on("UnhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    server.close(() => promise.exit(1));
});
