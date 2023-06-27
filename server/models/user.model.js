const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        quote: {
            type: String,
        },
    },
    { collection: "user-data" }
);

const model = mongoose.model("Userdata", User);

module.exports = model;
