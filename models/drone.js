const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
    serialNumber: {type: String, maxLength: 100, required: true },
    model: {type: String, enum: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'], required: true },
    weightLimit: { type: Number, max: 500, required: true },
    batteryCapacity: { type: Number, min: 0, max: 100, required: true },
    state: { type: String, enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'], required: true},
    medications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medication' }]
});

const Drone = mongoose.model('Drone', droneSchema);

module.exports = Drone;
