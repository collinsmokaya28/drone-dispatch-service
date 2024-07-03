## Drone Dispatch Service

### Description
The Drone Dispatch Service is a RESTful API that manages a fleet of drones for medication delivery. The service allows clients to register drones, load them with medication items, check loaded medications, check available drones for loading, and monitor drone battery levels. The project also includes periodic tasks to check drone battery levels and log history.

### Table of Contents

[Description](#description)

[Installation](#Installation)

[Usage](#Usage)

[API Endpoints](#API-Endpoints)

[Database Seeding](#Database-Seeding)

[Testing](#Testing)

[Technologies Used](#Technologies-Used)

[License](#License)

### Installation

#### Prerequisites
Node.js (v14 or later)

MongoDB (v4 or later)

Docker (optional, for running MongoDB in a container)

### Steps
1. Clone the Repository:
   ```
   git clone https://github.com/collinsmokaya28/drone-dispatch-service.git
   cd drone-dispatch-service
   ```
2. install Dependencies
   
   ```
   npm install
   ```
4. Start MongoDB:

If using Docker:
```
docker run --name mongodb -d -p 27017:27017 mongo:latest
```

If MongoDB is installed locally, ensure it is running:
```
sudo service mongod start
```

4. Run the Server:
   ```
   npm start
   ```
   
The server will start on port 3001 by default.

## Usage

### Running the Server

To start the server, run:
```
npm start
```

The server will be accessible at `http://localhost:3001`.

### API Endpoints

#### Register a Drone

**Endpoint**: `POST /drones/register`

 **Description**: Register a new drone.

**Payload**:

```
{
  "serialNumber": "DRONE001",
  "model": "Lightweight",
  "weightLimit": 100,
  "batteryCapacity": 50,
  "state": "IDLE"
}
```

### Load a Drone with Medication Items

**Endpoint**: `POST /drones/:id/load`

**Description**: Load a drone with medication items.

**Payload**:
```
{
  "medications": ["medication_id1", "medication_id2"]
}
```

### Check Loaded Medication Items for a Given Drone

**Endpoint**: `GET /drones/:id/medications`

**Description**: Get the list of medications loaded on a specific drone.

### Check Available Drones for Loading

**Endpoint**: `GET /drones/available`

**Description**: Get the list of drones available for loading.

### Check Drone Battery Level for a Given Drone

**Endpoint**: `GET /drones/:id/battery`

**Description**: Get the battery level of a specific drone.

## Database Seeding

To seed the database with initial data for drones and medications:

### Ensure MongoDB is Running:

Using Docker:
```
docker run --name mongodb -d -p 27017:27017 mongo:latest
```

Using local MongoDB:
```
sudo service mongod start
```
### Run the Seeder Script:
```
node seed.js
```

This will populate the database with predefined drones and medications.

## Testing

To run tests for the project:
```
npm test
```

## Technologies Used

**Node.js**: JavaScript runtime environment.

**Express.js**: Web framework for Node.js.

**Mongoose**: MongoDB object modeling tool.

**MongoDB**: NoSQL database.

**Docker**: Containerization platform.

**node-cron**: Task scheduler for running periodic tasks.

**Jest**: JavaScript testing framework.

**Supertest**: HTTP assertions library for Node.js.

## License

This project is licensed under the MIT License.
