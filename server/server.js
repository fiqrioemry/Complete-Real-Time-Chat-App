require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const services = require("./routes/index");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const { app, server } = require("./config/socket");

// env configure
const PORT = process.env.SERVER_PORT;
const CLIENT_HOST = process.env.CLIENT_HOST;

// support configure
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_HOST,
    credentials: true,
  })
);

app.use("/api/auth", services.authRoute);
app.use("/api/messages", services.messageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

// debug
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
