const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3001; // or any other port you prefer

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// Route to handle incoming location data
app.post('/receive-location', (req, res) => {
  const { latitude, longitude } = req.body;

  // Do something with the received location data, such as saving it to a database
  console.log('Received location data:', { latitude, longitude });

  // Create an object with received location data
  const locationData = { latitude, longitude };

  // Convert the object to JSON format
  const jsonData = JSON.stringify(locationData);

  fs.readFile('locationData.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading location data from file:', err);
      res.status(500).json({ error: 'Failed to read location data from file' });
      return;
    }

    let existingData = [];

    // Parse the existing data (or initialize as an empty array if file is empty or invalid JSON)
    if (data) {
        try {
          existingData = JSON.parse(data);
        } catch (parseError) {
          console.error('Error parsing existing data from file:', parseError);
          res.status(500).json({ error: 'Failed to parse existing data from file' });
          return;
        }
      }
  
      // Add the new location data to the existing array
      existingData.push(locationData);
  
      // Convert the combined data to JSON format
      const jsonData = JSON.stringify(existingData);
  
      // Write the JSON data back to the file
      fs.writeFile('locationData.json', jsonData, (writeErr) => {
        if (writeErr) {
          console.error('Error writing location data to file:', writeErr);
          res.status(500).json({ error: 'Failed to save location data' });
        } else {
          console.log('Location data saved to file');
          res.status(200).json({ message: 'Location data saved successfully' });
        }
      });
    });

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
