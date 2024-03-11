import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const IndiaMap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch location data from locationData.json
    fetch('..../backend/locationData.json')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error('Error fetching location data:', error));
  }, []);

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '500px', width: 'auto' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]}>
          <Popup>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default IndiaMap;
