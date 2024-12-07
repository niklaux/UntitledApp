require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
