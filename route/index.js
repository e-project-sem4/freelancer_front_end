const router = require("express").Router();
const fs = require("fs");



router.get("/login", (req, res) => {
    fs.readFile("./src/login.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
<<<<<<< HEAD
=======
router.get("/test", (req, res) => {
    fs.readFile("./src/test.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/Profile", (req, res) => {
    fs.readFile("./src/profile-user.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/ChangePassword", (req, res) => {
    fs.readFile("./src/recovery_passward.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/Jobmanager", (req, res) => {
    fs.readFile("./src/Job-manager.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
>>>>>>> ed628eba37dcfac6079f0931c893c61fc21f924f
router.get("/post-a-job", (req, res) => {
    fs.readFile("./src/post-a-job.html", "utf-8", (err, data) => {
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
router.get('/job-details', (req, res) => {
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

router.get("/job-detail-payment", (req, res) => {
    fs.readFile("./src/job-detail-payment.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});

router.get("/live-exch", (req, res) => {
    fs.readFile("./src/live-exch.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});


//router admin
router.get("/admin/login", (req, res) => {
    fs.readFile("./src/admin/src/LandingPage.Auth.Login.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/admin/dashboard", (req, res) => {
    fs.readFile("./src/admin/src/Dashboard.Default.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/admin/list-job", (req, res) => {
    fs.readFile("./src/admin/src/List-job.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/admin/list-skill", (req, res) => {
    fs.readFile("./src/admin/src/List-skill.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/admin/list-complexity", (req, res) => {
    fs.readFile("./src/admin/src/List-complexity.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/admin/list-expected-duration", (req, res) => {
    fs.readFile("./src/admin/src/List-expected-duration.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/admin/list-user", (req, res) => {
    fs.readFile("./src/admin/src/List-user.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/admin/list-freelancer", (req, res) => {
    fs.readFile("./src/admin/src/List-freelancer.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/admin/list-business", (req, res) => {
    fs.readFile("./src/admin/src/List-business.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/admin/job-details", (req, res) => {
    fs.readFile("./src/admin/src/job-details.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
router.get("/admin/transaction-management", (req, res) => {
    fs.readFile("./src/admin/src/transaction-management.html", "utf-8", (err, data) => {
        res.type("text/html");
        res.send(data);
    });
});
module.exports = router;