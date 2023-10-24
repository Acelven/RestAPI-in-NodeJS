import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import greencheck from './icons/green-checkmark.png'
import gray from './icons/gray.png'
import truck from './icons/truck.png'

const Tracking = () => {
  const [trackingInfo, setTrackingInfo] = useState(null);
  const trackingNumber = 'BPS1EP58YI5SKBR'; // Replace with the desired tracking number

  // Initialize an array to collect description and timestamp values
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tracking_parcel/${trackingNumber}`);
        setTrackingInfo(response.data);

        // Extract descriptions and format timestamps from the JSON data
        const collectedData = extractDescriptions(response.data);
        setDescriptions(collectedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Function to extract descriptions and format timestamps from tracking_code_locales
    function extractDescriptions(data) {
      const collectedData = [];

      if (Array.isArray(data.parcel_tracking_items)) {
        data.parcel_tracking_items.forEach((item) => {
          const trackingCodeLocales1 = item.tracking_code_vendor?.tracking_code?.tracking_code_locales;
          const trackingCodeLocales2 = item.tracking_code?.tracking_code_locales;

          const localesToUse = trackingCodeLocales1 || trackingCodeLocales2;

          if (Array.isArray(localesToUse)) {
            localesToUse.forEach((locale) => {
              if (locale.description && item.timestamp) {
                const formattedTimestamp = formatTimestamp(item.timestamp);
                collectedData.push({
                  description: locale.description,
                  timestamp: formattedTimestamp,
                });
              }
            });
          }
        });
      }

      return collectedData;
    }

    // Function to format timestamps
    function formatTimestamp(timestamp) {
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      return new Date(timestamp).toLocaleDateString('en-US', options);
    }

    fetchData();
  }, [trackingNumber]);

  if (!trackingInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tracking-page">
      <div className="tracking-info">
        <h1>Tracking Information</h1>
        <p>Tracking Number: {trackingNumber}</p>
        <p>Status: {trackingInfo.status}</p>

        {/* <h2>Descriptions</h2> */}
        <ul>
          {descriptions.map((item, index) => (
              <li key={index}>
              <div className="icon-container">
        {index === 0 ? (
          <img src={greencheck} alt="Green Checkmark" className="icon" />
        ) : (
          index === descriptions.length - 1 ? (
            <img src={truck} alt="Truck" className="truck-icon" />
          ) : (
            <img src={gray} alt="Gray Dot" className="gray-icon" />
          )
        )}
      </div>
      <span className="timestamp">{item.timestamp}</span>
      <span className="description">{item.description}</span>
    </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tracking;
