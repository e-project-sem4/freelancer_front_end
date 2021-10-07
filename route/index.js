const router = require("express").Router();
const fs = require("fs");

router.get("/about", (req, res) => {
    fs.readFile("./src/about.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});

router.get("/home", (req, res) => {
    fs.readFile("./src/home.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});

module.exports = router;