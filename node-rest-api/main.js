const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const secretKey = 'your-secret-key';

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Endpoint to generate a token
app.post('/generate_token', (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ error: 'Both login and password are required' });
  }

  // Combine login and password into a single string
  const combinedCredentials = `${login}:${password}`;

  // Generate a JSON Web Token (JWT) using the combined credentials
  const token = jwt.sign({ credentials: combinedCredentials }, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

// Endpoint to track a parcel
app.get('/tracking_parcel/:trackingNumber', async (req, res) => {
  const trackingNumber = req.params.trackingNumber;
  const bearerToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NzIzMjY1NTUsImV4cCI6MTcwMzg2MjU1NSwiYXVkIjoiaHR0cHM6Ly9icmluZ2VycGFyY2VsLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNTI1eXM2YWh4d3UyIiwianRpIjoiZDdlZGE3NDgtNzMxOS00YWIzLWI2MGEtMDEzMzI0NmVkNmY2In0.uJi6d6-E2zDWj24wryh2sVWKs4ceny4QllbrHrzK5L0'; // Your Bearer token

  try {
    
    const response = await axios.get(`https://bps.bringer.io/public/api/v2/get/parcel/tracking.json?tracking_number=${trackingNumber}`, {
      headers: {
        Authorization: bearerToken,
      },
    });

    const parcelInfo = response.data;

    res.json(parcelInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch parcel data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});