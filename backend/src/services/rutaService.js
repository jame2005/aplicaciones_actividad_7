const rutaRepository = require("../repositories/rutaRepository");

const obtenerRutas = async () => {
    console.log("Service: obtenerRutas");
    return await rutaRepository.getAllRutas();
};

const crearRuta = async (rutaData) => {
    console.log("Service: crearRuta");
    const insertId = await rutaRepository.createRuta(rutaData);
    return { id: insertId, ...rutaData };
};

const actualizarRuta = async (id, rutaData) => {
    console.log("Service: actualizarRuta", { id, ...rutaData });
    const affectedRows = await rutaRepository.updateRuta(id, rutaData);
    return affectedRows;
};

const eliminarRuta = async (id) => {
    console.log("Service: eliminarRuta", { id });
    const affectedRows = await rutaRepository.deleteRuta(id);
    return affectedRows;
};

module.exports = {
    obtenerRutas,
    crearRuta,
    actualizarRuta,
    eliminarRuta
};
