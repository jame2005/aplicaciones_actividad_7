require("dotenv").config();
const express = require("express");
const cors = require("cors");

const rutaRoutes = require("./routes/rutaRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/rutas", rutaRoutes);
app.use(errorHandler);

module.exports = app;
