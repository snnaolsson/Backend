// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth');

// Skapa nytt menyobjekt (skyddad rutt)
router.post('/', auth, async (req, res) => {
    try {
        const newItem = new MenuItem(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Hämta alla menyobjekt
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Hämtar och sorterar menyalternativen
router.get('/menu', async (req, res) => {
    try {
        const desserts = await MenuItem.find({ category: 'Desserts' });
        const drinks = await MenuItem.find({ category: 'Drinks' });
        res.json({ desserts, drinks });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Uppdatera ett menyobjekt (skyddad rutt)
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Radera ett menyobjekt (skyddad rutt)
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Menu item deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
