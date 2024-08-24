// models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
