const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/score', (req, res) => {
    res.json({ message: 'Your current scopre is 100' });

    const { score } = req.body;
    console.log(`Sharing score: ${score}`);
    res.json({ message: `Score ${score} shared successfully!` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
