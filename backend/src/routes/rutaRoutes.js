const express = require("express");
const validarRuta = require("../middlewares/validarRuta");

const router = express.Router();

const {
    obtenerRutas,
    crearRuta,
    actualizarRuta,
    eliminarRuta
} = require("../controllers/rutaController");

router.get("/", obtenerRutas);
router.post("/", validarRuta, crearRuta);
router.put("/:id", validarRuta, actualizarRuta);
router.delete("/:id", eliminarRuta);

module.exports = router;
