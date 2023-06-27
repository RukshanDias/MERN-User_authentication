// import
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors()); // cors middleware: use casue have differnt server paths in client & server

app.get("/hello", (req, res) => {
    res.send("hello world");
});

app.listen(8000, () => {
    console.log("server started");
});
