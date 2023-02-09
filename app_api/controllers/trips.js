const mongoose = require('mongoose'); //.set('debug', true);
const Model = mongoose.model('trips');

//GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    Model
        .find({}) //empty filter for all
        .exec((err, trips) => {
            if(!trips){
                return res.status(404)
                          .json({"message": "trips not found"});
            } else if (err) {
                return res.status(404)
                          .json(err);
            } else {
                return res.status(200)
                          .json(trips);
            }
        })
};

//GET: /trips/:tripcode - returns a single trip
const tripsFindByCode = async (req, res) => {
    Model
        .find({"code": req.params.tripCode}) //filter by trip code given in url
        .exec((err, trip) => {
            if(!trip){
                return res.status(404)
                          .json({"message": "trip not found"});
            } else if (err) {
                return res.status(404)
                          .json(err);
            } else {
                return res.status(200)
                          .json(trip);
            }
        })
};

//POST: /tripsAddTrip
const tripsAddTrip = async (req,res) => {
    Model
    .create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    },
    (err, trip) => {
        if (err) {
            return res
                .status(400) // bad request, invalid content
                .json(err);
        } else {
            return res
                .status(201) //created
                .json(trip);
        }
    });
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip
};