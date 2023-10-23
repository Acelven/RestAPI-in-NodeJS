import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tracking = () => {
  const [trackingInfo, setTrackingInfo] = useState(null);
  const trackingNumber = 'BPS1EP58YI5SKBR'; // Replace with the desired tracking number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tracking_parcel/${trackingNumber}`);
        setTrackingInfo(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [trackingNumber]);

  if (!trackingInfo) {
    return <div>Loading...</div>;
  }

  // Render your component based on the trackingInfo JSON data
  return (
    <div>
      <h1>Tracking Information</h1>
      <p>Tracking Number: {trackingNumber}</p>
      <p>Status: {trackingInfo.status}</p>
      <p>Description: {trackingInfo.description}</p>
      
      {/* Add more details as needed */}
    </div>
  );
}

export default Tracking;