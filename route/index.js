const router = require("express").Router();
const fs = require("fs");



router.get("/login", (req, res) => {
    fs.readFile("./src/login.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});

router.get("/about", (req, res) => {
    fs.readFile("./src/about.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});

router.get("/home", (req, res) => {
    fs.readFile("./src/index.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/signup", (req, res) => {
    fs.readFile("./src/signup.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/job-list", (req, res) => {
    fs.readFile("./src/job-list.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/job-details", (req, res) => {
    fs.readFile("./src/job-details.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/candidate-list", (req, res) => {
    fs.readFile("./src/candidates-listing.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/candidate-details", (req, res) => {
    fs.readFile("./src/candidates-profile.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/employer-list", (req, res) => {
    fs.readFile("./src/employers-list.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/employer-details", (req, res) => {
    fs.readFile("./src", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});

router.get("/about", (req, res) => {
    fs.readFile("./src/about.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/proposal-list", (req, res) => {
    fs.readFile("./src/proposal-list.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/service", (req, res) => {
    fs.readFile("./src/services.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/team", (req, res) => {
    fs.readFile("./src/team.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/faq", (req, res) => {
    fs.readFile("./src/faq.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/contact", (req, res) => {
    fs.readFile("./src/contact.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/pricing", (req, res) => {
    fs.readFile("./src/pricing.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});

module.exports = router;