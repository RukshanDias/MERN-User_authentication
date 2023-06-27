// import
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors()); // cors middleware: use casue have differnt server paths in client & server
app.use(express.json()); // pass anything in req as json

app.post("/api/register", async (req, res) => {
    console.log(req.body);
    res.send({ status: "ok" });
});

app.listen(8000, () => {
    console.log("server started");
});
