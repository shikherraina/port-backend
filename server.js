const express = require("express");
const cors = require("cors");

const httpLogger = require("./src/middleware/httpLogger");
const logger = require("./src/utils/logger");

const app = express();
const PORT = process.env.PORT || 8080;

/* -------------------- MIDDLEWARE -------------------- */

// JSON & URL-encoded body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logging (Morgan → Winston)
app.use(httpLogger);

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://port-frontend-sable.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

/* -------------------- ROUTES -------------------- */

app.get("/", (req, res) => {
  logger.info("Root endpoint hit");
  res.send("Hello, Express.js server is running!");
});

app.get("/health", (req, res) => {
  logger.info("Health check endpoint hit");

  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "port-backend",
  });
});

/* -------------------- ERROR HANDLING -------------------- */

// 404 handler
app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
});

// Global error handler (must be last)
app.use(require("./src/middleware/errorHandler"));

/* -------------------- SERVER -------------------- */

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
