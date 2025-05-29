const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const Booking = require('../models/Booking');

// Create booking
router.post('/', [
  check('services', 'Services are required').not().isEmpty(),
  check('salon', 'Salon is required').not().isEmpty()
], async (req, res) => {
  try {
    // Add ₹5 booking fee
    const booking = new Booking({
      ...req.body,
      bookingFee: 5,
      totalPrice: req.body.totalPrice + 5
    });
    
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;