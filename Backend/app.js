const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 1234;
const indexroute=require("./Routes/index")
const cookieParser = require("cookie-parser");



// Load route files

// Middleware
const allowedOrigins = [
  "http://localhost:5173", // for local dev (if using Vite)
  "https://mycookies.nebiatzportfolio.com", // for live
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Raw request body:", req.body);
  next();
});


// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});
// refresh cookies
app.use(cookieParser());

// Mount routes under /API
app.use("/API" ,indexroute)

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(port, (error) => {
  if (error) {
    console.error("Server failed to start:", error);
  } else {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`API endpoints available at http://localhost:${port}/API`);
  }
});
