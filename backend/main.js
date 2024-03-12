const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'location_aw9a_user',
  host: 'dpg-cno2gaacn0vc73e6jh60-a',
  database: 'location_aw9a',
  password: 'NWGQ5eU4MahxERi4KJ1q41nhGFBg2Ju4',
  port: 5432, // Default PostgreSQL port
});

// Route to handle incoming location data
app.post('/receive-location', async (req, res) => {
  const { latitude, longitude } = req.body;

  console.log('Received location data:', { latitude, longitude });

  try {
    // Insert the location data into the database
    const query = 'INSERT INTO location_data (latitude, longitude) VALUES ($1, $2)';
    await pool.query(query, [latitude, longitude]);
    
    console.log('Location data saved to database');
    res.status(200).json({ message: 'Location data saved successfully' });
  } catch (error) {
    console.error('Error saving location data:', error);
    res.status(500).json({ error: 'Failed to save location data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
