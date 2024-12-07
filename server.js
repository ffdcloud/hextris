const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/score', (req, res) => {
    const { score } = req.body;
    console.log(`Sharing score: ${score}`);
    res.json({ message: 'Success!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
