// import
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const User = require("./models/user.model");

app.use(cors()); // cors middleware: use casue have differnt server paths in client & server
app.use(express.json()); // pass anything in req as json

app.post("/api/register", async (req, res) => {
    console.log(req.body);
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.json({ status: "ok" });
    } catch (err) {
        res.json({ status: "error", error: "Duplicate email" });
    }
});

mongoose
    .connect(process.env.DB_CONNECT, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to db!");
        app.listen(8000, () => {
            console.log("server started");
        });
    })
    .catch((err) => {
        console.error(err);
    });
