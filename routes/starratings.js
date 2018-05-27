const express = require('express')
const router = express.Router();
const AirlineSchema = require("../models/airline");

router.post('/:rating', function (req, res, next) {
    console.log("id: " + req.body._id);
    console.log("email: " + req.body.userEmail);
    console.log("rating: " + req.params.rating);

    AirlineSchema.findById(req.body._id, (err, airline) => {
        if (airline == null || err) {
            res.status(501).send({ "message": "Airline " + req.body._id + " not found." })
        }
        else {
            if (!err) {
                console.log(airline.starRatings);
                console.log(airline.starRatings.filter(x => x.userEmail === req.body.userEmail));
                var toBeDeleted = airline.starRatings.filter(x => x.userEmail === req.body.userEmail)

                //Delete existing rating
                for (var i = 0; i <= toBeDeleted.length - 1; i++) {
                    airline.starRatings.remove(toBeDeleted[i]._id)
                }

                //Add New Rating
                airline.starRatings.push({ rating: req.params.rating, userEmail: req.body.userEmail });

                //Update Average Rating
                var total = 0;
                var count = airline.starRatings.length;
                for (var i = 0; i <= airline.starRatings.length - 1; i++) {
                    total += airline.starRatings[i].rating;
                }

                airline.starsCount = Math.round(total / count);

                airline.save((err, airline) => {
                    res.status(200).send(airline)
                });
            }
        }
    });

    /*
    AirlineSchema.findById(req.body._id, (err, airline) => {
        if (airline == null || err) {
            res.status(501).send({ "message": "Airline " + req.body.pid + " not found." })
        }
        else {
            if (!err) {
                airline.starRatings.push({ rating: req.params.rating, userEmail: req.body.userEmail });
                airline.save((err) => {
                    res.status(200).send(airline);
                })
            }
        }
    });*/
});



module.exports = router;
