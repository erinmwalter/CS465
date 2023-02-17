const mongoose = require('mongoose'); //.set('debug', true);
const Model = mongoose.model('trips');
const User = mongoose.model('users');

//Get user
const getUser = (req,res,callback) => {
    console.log(req.payload);
    if(req.payload && req.payload.email) {
        console.log("in if loop");
        User.findOne({email: req.payload.email})
            .exec((err,user) => {
                if(!user) {
                    return res
                            .status(404)    
                            .json({"message": "User not found"});
                } else if (err) {
                    console.log(error);
                    return res.status(404).json(err);
                }
                callback(req,res,user.name);
            });
    } else {
        console.log("in else loop");
        return res.status(404).json({"message": "User not found"});
    }
};



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

//POST: /trips/addTrip
const tripsAddTrip = async (req,res) => {
    getUser(req, res, (req,res) => {
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
});
}

//PUT: /trips/:tripCode - updates single trip
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req,res) => {
    Model
    .findOneAndUpdate({ 'code': req.params.tripCode }, {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    }, { new: true })
    .then(trip => {
        if (!trip) {
            return res
                    .status(404)
                    .send({message: "Trip not found with code " + req.params.tripCode});
            }
        res.send(trip);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({message: "Trip not found with code " + req.params.tripCode});
    }
        return res
            .status(500) // server error
            .json(err);
            });
        });
   }

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};