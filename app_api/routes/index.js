const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

/* GET home page. */
router.route('/trips')
      .get(tripsController.tripsList);
router.route('/trips/:tripCode')
      .get(tripsController.tripsFindByCode)
      .put(tripsController.tripsUpdateTrip);
router.route('/trips/addTrip')
      .post(tripsController.tripsAddTrip);

module.exports = router;
