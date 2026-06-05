const validarRuta = (req, res, next) => {
    const { destino, horario, tipo, estado, bus } = req.body;
    const errores = [];

    if (!destino || typeof destino !== "string" || destino.trim().length < 3 || destino.trim().length > 50) {
        errores.push("El destino es obligatorio (3-50 caracteres).");
    }
    if (!horario || typeof horario !== "string" || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(horario)) {
        errores.push("El horario es obligatorio y debe tener formato HH:mm.");
    }
    if (!["Normal", "Expreso"].includes(tipo)) {
        errores.push("El tipo de ruta debe ser 'Normal' o 'Expreso'.");
    }
    if (!["Disponible", "Mantenimiento"].includes(estado)) {
        errores.push("El estado debe ser 'Disponible' o 'Mantenimiento'.");
    }
    if (!bus || typeof bus !== "string" || bus.trim().length === 0) {
        errores.push("La información del bus es obligatoria.");
    }

    if (errores.length > 0) {
        return res.status(400).json({
            estado: "error",
            mensaje: "Datos de ruta inválidos",
            detalles: errores
        });
    }

    next();
};

module.exports = validarRuta;
