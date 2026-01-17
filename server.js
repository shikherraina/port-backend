const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;


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

app.get("/", (req, res) => {
  res.send("Hello, Express.js server is running!");
});
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "port-backend",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
