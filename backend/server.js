require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor API corriendo en http://localhost:${PORT}`);
    console.log(`Endpoints disponibles: GET, POST, PUT, DELETE en http://localhost:${PORT}/api/rutas`);
});

