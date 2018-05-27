const express = require('express')
const router = express.Router();
const AirlineSchema = require("../models/airline");
const auth = require('../common/auth');




router.get('/', function (req, res, next) {
    //var AirlineSchema = new AirlineSchema();

    AirlineSchema.find((err, Airlines) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } else {
            // send the list of all people
            res.status(200).send(Airlines);
        }
    });
});

router.get('/:id', function (req, res, next) {
    //var AirlineSchema = new AirlineSchema();

    AirlineSchema.findById(req.params.id,(err, Airline) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } else {
            // send the list of all people
            res.status(200).send(Airline);
        }
    });
});


router.post('/', function (req, res, next) {
    var airline = new AirlineSchema();
    airline.name = req.body.name
    airline.imagePath = req.body.imagePath

    airline.save((err, createdAirlineObject) => {
        if (err) {
            res.status(500).send(err);
        }
        // This createdTodoObject is the same one we saved, but after Mongo
        // added its additional properties like _id.
        res.status(200).send(createdAirlineObject);
    });
});

router.put('/', function (req, res, next) {
    var airline = new AirlineSchema();
    airline.name = req.body.name

    AirlineSchema.findById(req.body._id,(err, FoundAirline) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } else {
            FoundAirline.name = req.body.name;
            FoundAirline
            res.status(200).send(Airline);
        }
    });
});

/*router.post('/:comment', function (req, res, next) {
    console.log("id: " + req.body._id);
    console.log("comment: " + req.params.comment );
    AirlineSchema.findById(req.body._id, (err, airline) => {
        if (airline == null || err) {
            res.status(501).send({ "message": "Airline " + req.body.pid + " not found." })
        }
        else {
            if (!err) {
                airline.comments.push({ body: req.params.comment });
                airline.save((err) => {
                    res.status(200).send(airline);
                })
            }
        }
    });
});*/

router.delete('/:id', function (req, res, next) {
    console.log("Inside delete..")
    AirlineSchema.findByIdAndRemove(req.params.id, (err, deletedAirline) => {
        if (deletedAirline) {
            let response = {
                message: "Airline successfully deleted",
                id: deletedAirline._id
            };
            res.status(200).send(response);
        }
        else {
            let response = {
                message: "Airline not found",
            };
            res.status(404).send(response);
        }
    });
});

router.patch('/:id', function (req, res, next) {
    AirlineSchema.findById(req.params.id, (err, airlineToUpdate) => {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            airlineToUpdate.name = req.body.name || airlineToUpdate.name;

            // Save the updated document back to the database
            airlineToUpdate.save((err, airlineUpdated) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.status(200).send(airlineUpdated);
            });
        }
    });
});


module.exports = router;
