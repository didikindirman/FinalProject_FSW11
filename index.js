const express = require("express");
const dotenv = require("dotenv");
const formidable = require("express-formidable");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(formidable());

// Auth Routes

// User Routes

// Product Routes

app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}`);
});
