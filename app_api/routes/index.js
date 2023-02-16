const express = require('express');
const router = express.Router();

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

//For logging in
router.route('/login')
      .post(authController.login);
router.route('/register')
      .post(authController.register);

/* GET home page. */
router.route('/trips')
      .get(tripsController.tripsList);
router.route('/trips/:tripCode')
      .get(tripsController.tripsFindByCode)
      .put(tripsController.tripsUpdateTrip);
router.route('/trips/addTrip')
      .post(tripsController.tripsAddTrip);

module.exports = router;
