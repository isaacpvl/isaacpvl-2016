var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var routes = require("./routes/index");
var threadmeup = require("./routes/threadmeup");
var coolhouse = require("./routes/coolhouse");
var dostoros = require("./routes/dostoros");
var huddlepass = require("./routes/huddlepass");
var socialcrunch = require("./routes/socialcrunch");
var lifeis = require("./routes/lifeis");
var overdog = require("./routes/overdog");
var weirdshit = require("./routes/weirdshit");
var users = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
if (app.get("env") === "development") {
    app.use(require("connect-livereload")());
}
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.get("/threadmeup", threadmeup);
app.get("/coolhouse", coolhouse);
app.get("/dostoros", dostoros);
app.get("/huddlepass", huddlepass);
app.get("/socialcrunch", socialcrunch);
app.get("/lifeis", lifeis);
app.get("/overdog", overdog);
app.get("/weirdshit", weirdshit);
app.use("/users", users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});


module.exports = app;
