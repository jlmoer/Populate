const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Model:
const User = require("./userModel");

// Middleware:
app.use(express.json());

// Connection to the database:
mongoose
    .connect(
        process.env.MONGO_URI
        ,
        {
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("Connected to MongoDB"));

// Server start:
app.listen(8000, () => {
    console.log("Listening on port 8000...");
});