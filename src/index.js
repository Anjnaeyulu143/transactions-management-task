require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(require("cors")());
connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err.message);
    exit(1); // Exit process with an error
  });

// Routes
app.use("/api/transactions", transactionRoutes);
