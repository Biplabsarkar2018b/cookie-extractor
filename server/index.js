const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const PORT = 3000; // Change this to your desired port

// Proxy endpoint
app.post('/cookie', async (req, res) => {
    const url = req.body.url
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': req.headers['user-agent'], // Forward the user-agent header
        'Referer': url // Set the Referer header to the target URL
      }
    });

    const cookies = response.headers['set-cookie'];

    if (cookies) {
      res.json({ cookies });
    } else {
      res.json({ message: 'No cookies found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
