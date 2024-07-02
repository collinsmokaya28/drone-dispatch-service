const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
    name: { type: String, match: /^[A-Za-z0-9-_]+$/, required: true },
    weight: { type: Number, required: true},
    code: { type: String, match: /^[A-z0-9_]+$/, required: true},
    image: { type: String }
});

const Medication = mongoose.model('Medication', MedicationSchema);

module.exports = Medication;