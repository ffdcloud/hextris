const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// MySQL RDS Configuration
const dbConfig = {
    host: 'hextris-database-instance.cewnvgrwslmi.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Feb!8899',
    database: 'hextris',
    port: 3306
};

// Function to connect to MySQL
async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log("Connected to MySQL database");
        return connection;
    } catch (error) {
        console.error("Error connecting to MySQL database:", error);
        process.exit(1);
    }
}

app.post('/api/score', async (req, res) => {
    const { name, score } = req.body;
    console.log(`Sharing ${name}'s score: ${score}`);

    try {
        const connection = await connectToDatabase();
        const [result] = await connection.execute(
            "INSERT INTO scores (name, score) VALUES (?, ?)",
            [name, score]
        );
        console.log(`Inserted score of ${score} with ID ${result.insertId}`);
        res.json({ message: 'Success!' });

    } catch(error) {
        console.error("Error inserting score into database:", error);
        res.status(500).json({ error: "Failed to save score to the database" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
