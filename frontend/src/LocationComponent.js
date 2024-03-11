
import React, { useEffect, useState } from 'react';
import Map from './map';

const LocationComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            console.log(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation();

    // Function to send location to backend
    const sendLocationToBackend = async () => {
      try {
        // Check if latitude and longitude are available
        if (latitude !== null && longitude !== null) {
          // Make a fetch request to your backend API
          const response = await fetch('http://localhost:3001/receive-location', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude }),
          });

          if (response.ok) {
            console.log('Location sent to backend successfully.');
          } else {
            console.error('Failed to send location to backend:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error sending location to backend:', error);
      }
    };

    // Call the function to send location to backend
    sendLocationToBackend();
  }, [latitude, longitude]); // Run whenever latitude or longitude changes

  return (
    <div>
      Latitude: {latitude} <br />
      Longitude: {longitude}
    </div>
  );
};


export default LocationComponent;
