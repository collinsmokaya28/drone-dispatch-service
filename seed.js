const mongoose = require('mongoose');
const Drone = require('./models/drone');
const Medication = require('./models/medication');

// Initial Data
const drones = [
  {
    serialNumber: 'DRONE001',
    model: 'Lightweight',
    weightLimit: 100,
    batteryCapacity: 50,
    state: 'IDLE'
  },
  {
    serialNumber: 'DRONE002',
    model: 'Middleweight',
    weightLimit: 200,
    batteryCapacity: 75,
    state: 'IDLE'
  },
  {
    serialNumber: 'DRONE003',
    model: 'Cruiserweight',
    weightLimit: 300,
    batteryCapacity: 100,
    state: 'IDLE'
  }
];

const medications = [
  {
    name: 'Medication1',
    weight: 10,
    code: 'MED1',
    image: 'http://example.com/med1.jpg'
  },
  {
    name: 'Medication2',
    weight: 20,
    code: 'MED2',
    image: 'http://example.com/med2.jpg'
  },
  {
    name: 'Medication3',
    weight: 30,
    code: 'MED3',
    image: 'http://example.com/med3.jpg'
  }
];

// Seed Drones
const seedDrones = async () => {
  try {
    await Drone.deleteMany({});
    await Drone.insertMany(drones);
    console.log('Drones seeded');
  } catch (error) {
    console.error('Error seeding drones:', error);
  }
};

// Seed Medications
const seedMedications = async () => {
  try {
    await Medication.deleteMany({});
    await Medication.insertMany(medications);
    console.log('Medications seeded');
  } catch (error) {
    console.error('Error seeding medications:', error);
  }
};

// Run Seeders
const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/droneDB');
    console.log('Connected to MongoDB');
    await seedDrones();
    await seedMedications();
    mongoose.connection.close();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

seedDatabase();

