// dependencies
var express = require('express');
var db = require("./models");
var exphbs = require("express-handlebars");
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

// Static directory
app.use(express.static(__dirname + '/public/'));
//app.use(express.static("/public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: __dirname + '/views/partials/'
}));
app.set("view engine", "handlebars");

// Routes
require("./routes/api-routes")(app);
//require('./routes/html-routes')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({
    force: false
}).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
