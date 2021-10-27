const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const cookieParser = require('cookie-parser');

let PORT = 8080;


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cookieParser());

app.use(express.static("src"));

app.use(cors());

const indexRouter = require("./route/index");
app.use("/", indexRouter);

http.listen(PORT, () => {
    console.log(PORT + " Connected!");
});