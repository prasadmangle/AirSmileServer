const express = require('express')
const router = express.Router();
const AirlineSchema = require("../models/airline");

router.post('/', function (req, res, next) {

    console.log("airlineid: " + req.body.airline_id);
    console.log("commentid: " + req.body.comment_id);

    AirlineSchema.findById(req.body.airline_id, (err, airline) => {
        if (airline == null || err) {
            res.status(501).send({ "message": "Airline " + req.body.airline_id + " not found." })
        }
        else {
            if (!err) {
                airline.comments.remove(req.body.comment_id);
                airline.save((err,airline)=>{
                    res.status(200).send(airline)
                });
            }
        }
    });
});

router.post('/:comment', function (req, res, next) {
    console.log("id: " + req.body._id);
    console.log("Email: " + req.body.userEmail);
    console.log("comment: " + req.params.comment);
    AirlineSchema.findById(req.body._id, (err, airline) => {
        if (airline == null || err) {
            res.status(501).send({ "message": "Airline " + req.body.pid + " not found." })
        }
        else {
            if (!err) {
                airline.comments.push({ body: req.params.comment, userEmail: req.body.userEmail });
                airline.save((err) => {
                    res.status(200).send(airline);
                })
            }
        }
    });
});



module.exports = router;
