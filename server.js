const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

// These utilize Render's secure Environment Variables
const CLIENT_ID = '2673c0c013914bc1953ba14f30043ecd'; 
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET; 
const REDIRECT_URI = 'https://zaroolfc999-bit.github.io/stridesafe-beta-/';

// Token exchange endpoint
app.post('/api/token', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }).toString(),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Token Exchange Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to exchange token' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`StrideSafe Auth Server running on port ${PORT}`));
