const express = require("express");

const router = express.Router();

const {
    obtenerRutas,
    crearRuta,
    actualizarRuta,
    eliminarRuta
} = require("../controllers/rutaController");

router.get("/", obtenerRutas);
router.post("/", crearRuta);
router.put("/:id", actualizarRuta);
router.delete("/:id", eliminarRuta);

module.exports = router;
