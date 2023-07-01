const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

// initial app
const app = express();

// inital dotenv
dotenv.config();

// middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// routes
app.get("/", (req, res) => {
  res.send("Hello");
});

// run server
app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
