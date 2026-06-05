const rutaService = require("../services/rutaService");

const obtenerRutas = async (req, res, next) => {
    console.log("Controller: obtenerRutas");
    try {
        const rutas = await rutaService.obtenerRutas();
        res.json({
            estado: "exito",
            datos: rutas
        });
    } catch (error) {
        next(error);
    }
};

const crearRuta = async (req, res, next) => {
    console.log("Controller: crearRuta");
    try {
        const rutaCreada = await rutaService.crearRuta(req.body);
        res.status(201).json({
            estado: "exito",
            mensaje: "Ruta creada correctamente",
            datos: rutaCreada
        });
    } catch (error) {
        next(error);
    }
};

const actualizarRuta = async (req, res, next) => {
    console.log("Controller: actualizarRuta");
    try {
        const { id } = req.params;
        const affectedRows = await rutaService.actualizarRuta(id, req.body);

        if (!affectedRows) {
            return res.status(404).json({
                estado: "error",
                mensaje: "Ruta no encontrada"
            });
        }

        res.json({
            estado: "exito",
            mensaje: "Ruta actualizada",
            datos: {
                id: Number(id),
                ...req.body
            }
        });
    } catch (error) {
        next(error);
    }
};

const eliminarRuta = async (req, res, next) => {
    console.log("Controller: eliminarRuta");
    try {
        const { id } = req.params;
        const affectedRows = await rutaService.eliminarRuta(id);

        if (!affectedRows) {
            return res.status(404).json({
                estado: "error",
                mensaje: "Ruta no encontrada"
            });
        }

        res.json({
            estado: "exito",
            mensaje: "Ruta eliminada correctamente"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerRutas,
    crearRuta,
    actualizarRuta,
    eliminarRuta
};
