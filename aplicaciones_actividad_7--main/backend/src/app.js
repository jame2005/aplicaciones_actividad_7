const express = require("express");
const cors = require("cors");

const rutaRoutes = require("./routes/rutaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/rutas", rutaRoutes);

module.exports = app;
