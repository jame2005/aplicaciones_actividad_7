const db = require("../config/db");

const obtenerRutas = (req, res) => {

    db.query(
        "SELECT * FROM rutas",
        (error, resultados) => {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json(resultados);
        }
    );
};

const crearRuta = (req, res) => {

    const {
        destino,
        bus,
        horario,
        estado,
        tipo
    } = req.body;

    db.query(
        `INSERT INTO rutas
        (destino, bus, horario, estado, tipo)
        VALUES (?, ?, ?, ?, ?)`,
        [
            destino,
            bus,
            horario,
            estado,
            tipo
        ],
        (error, resultado) => {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.status(201).json({
                mensaje: "Ruta creada correctamente",
                id: resultado.insertId
            });
        }
    );
};

const actualizarRuta = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            destino,
            bus,
            horario,
            estado,
            tipo
        } = req.body;

        const sql = `
            UPDATE rutas
            SET destino=?, bus=?, horario=?, estado=?, tipo=?
            WHERE id=?
        `;

        db.query(
            sql,
            [destino, bus, horario, estado, tipo, id],
            (error) => {
                if (error) {
                    return res.status(500).json({
                        estado: "error",
                        mensaje: error.message
                    });
                }

                res.json({
                    estado: "exito",
                    mensaje: "Ruta actualizada",
                    datos: {
                        id: Number(id),
                        destino,
                        bus,
                        horario,
                        estado,
                        tipo
                    }
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            estado: "error",
            mensaje: error.message
        });
    }
};

const eliminarRuta = async (req, res) => {
    try {
        const { id } = req.params;

        db.query(
            "DELETE FROM rutas WHERE id=?",
            [id],
            (error) => {

                if (error) {
                    return res.status(500).json({
                        estado: "error",
                        mensaje: error.message
                    });
                }

                res.json({
                    estado: "exito",
                    mensaje: "Ruta eliminada correctamente"
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            estado: "error",
            mensaje: error.message
        });
    }
};


module.exports = {
    obtenerRutas,
    crearRuta,
    actualizarRuta,
    eliminarRuta
};
