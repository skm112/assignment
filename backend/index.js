var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose")
const port = process.env.PORT || 3000;

//@paths
const db = require("./config/config").mongoURL;
const taskAPI = require("./routes/task.api");


//@access controls----------------------------------------------
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    next();
});

//@middleware --- body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//@connect database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected successfully..."))
    .catch(err => console.log(err));

//@actual routes
app.use('/task', taskAPI);

app.listen(port, () => console.log(`Server is running at PORT: ${port} ...`));