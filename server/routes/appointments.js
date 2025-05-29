const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const appointmentsController = require('../controllers/appointments');

// @route   POST api/appointments
// @desc    Create new appointment
// @access  Private
router.post('/', auth, appointmentsController.createAppointment);

// @route   GET api/appointments
// @desc    Get user appointments
// @access  Private
router.get('/', auth, appointmentsController.getUserAppointments);

// @route   PUT api/appointments/:id/cancel
// @desc    Cancel appointment
// @access  Private
router.put('/:id/cancel', auth, appointmentsController.cancelAppointment);

module.exports = router;