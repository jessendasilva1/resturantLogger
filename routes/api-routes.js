var db = require('../models');

module.exports = function (app) {

    // index route loads view.html
    app.get("/", function (req, res) {
        var eaten = [];
        var notEaten = [];
        db.Burger.findAll({}).then(function (data) {
            for(var i = 0; i < data.length; i++){
                if(data[i].devoured === false){
                    notEaten.push(data[i]);
                }else{
                    eaten.push(data[i]);
                }
            }
            var hbsObject = {
                eaten: eaten,
                notEaten: notEaten
            };
            //console.log(typeof data);
            res.render("index", hbsObject);
        });
    });

    // adding a new burger
    app.post("/newBurger", function (req, res) {
        console.log("new burger api endpoint ");
        db.Burger.create({
                burger_name: req.body.name,
                devoured: false
            })
            .then(function (dbBurger) {
                var name = {
                    burgerName: dbBurger.burger_name
                };
                res.json({
                    burgerName: name
                });
            });
    });

    app.put("/devourBurger", function (req, res) {
        console.log(req.body.burgerID);
        db.Burger.update({
            devoured: 1
        }, {
            where: {
                id: req.body.burgerID
            }
        }).then(function () {
            res.send("updated successfully");
        })
    })
}