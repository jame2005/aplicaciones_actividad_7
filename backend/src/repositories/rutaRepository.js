const db = require("../config/db");

const getAllRutas = async () => {
    console.log("Repository: getAllRutas");
    const [rows] = await db.promise().query("SELECT * FROM rutas");
    return rows;
};

const createRuta = async ({ destino, bus, horario, estado, tipo }) => {
    console.log("Repository: createRuta");
    const [result] = await db.promise().query(
        `INSERT INTO rutas (destino, bus, horario, estado, tipo) VALUES (?, ?, ?, ?, ?)`,
        [destino, bus, horario, estado, tipo]
    );
    return result.insertId;
};

const updateRuta = async (id, { destino, bus, horario, estado, tipo }) => {
    console.log("Repository: updateRuta", { id });
    const [result] = await db.promise().query(
        `UPDATE rutas SET destino=?, bus=?, horario=?, estado=?, tipo=? WHERE id=?`,
        [destino, bus, horario, estado, tipo, id]
    );
    return result.affectedRows;
};

const deleteRuta = async (id) => {
    console.log("Repository: deleteRuta", { id });
    const [result] = await db.promise().query(
        `DELETE FROM rutas WHERE id=?`,
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllRutas,
    createRuta,
    updateRuta,
    deleteRuta
};
