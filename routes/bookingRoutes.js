// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');  // Om du vill skydda vissa rutter

// Skapa en ny bokning
router.post('/', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Hämta alla bokningar (skyddad rutt)
router.get('/', auth, async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Hämta en specifik bokning baserat på ID (skyddad rutt)
router.get('/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Uppdatera en bokning (skyddad rutt)
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBooking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Radera en bokning (skyddad rutt)
router.delete('/:id', auth, async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
