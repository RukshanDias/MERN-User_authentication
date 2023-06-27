// import
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(cors()); // cors middleware: use casue have differnt server paths in client & server
app.use(express.json()); // pass anything in req as json

app.post("/api/register", async (req, res) => {
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        });
        res.json({ status: "ok" });
    } catch (err) {
        res.json({ status: "error", error: "Duplicate email" });
    }
});

// Login
app.post("/api/login", async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email }); // bad to store pass like this -> password: req.body.password
    if (!user) {
        return { status: "error", error: "Invalid login: email not registerd" };
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET_KEY
        );
        res.json({ status: "ok", user: token });
    } else {
        res.json({ status: "error", error: "email password dont match", user: false });
    }
});

// qoute
app.get("/api/quote", async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const email = decoded.email;
        const user = await User.findOne({ email: email });
        return res.json({ status: "ok", quote: user.quote });
    } catch (error) {
        console.log(error);
        res.json({ status: "error", error: "invalid token" });
    }
});

// create qoute
app.post("/api/quote", async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const email = decoded.email;
        await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });
        return res.json({ status: "ok" });
    } catch (error) {
        console.log(error);
        res.json({ status: "error", error: "invalid token" });
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
