const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const app = express();

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
