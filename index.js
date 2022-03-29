const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Model:
const Student = require("./models/studentModel");
const Address = require("./models/addressModel");


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

// Routes:

// First Route:
app.post("/students", async (req, res) => {

    const address = await Address.create(req.body.address);
    const student = new Student({
        firstName: req.body.id,
        surName: req.body.student.surName,
        address: address.id,
    });
    await student.save();

    res.status(201).send("Student succesfully created");
});

// Second route:
app.get("/students/:id", async (req, res) => {
    const student = await Student.findById(req.params.id).populate("address");

    res.json(student);
});

// Server start:
app.listen(8000, () => {
    console.log("Listening on port 8000...");
});