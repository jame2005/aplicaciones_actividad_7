const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Datos de ejemplo (Mock Data)
let rutas = [
    { id: 1, destino: "Facultad de Ingeniería", horario: "07:00", tipo: "Normal", estado: "Disponible", bus: "Bus 01" },
    { id: 2, destino: "Campus Central", horario: "08:30", tipo: "Expreso", estado: "Disponible", bus: "Bus 05" },
    { id: 3, destino: "Biblioteca General", horario: "12:00", tipo: "Normal", estado: "Mantenimiento", bus: "Bus 02" }
];

/**
 * Middleware de validación para Rutas
 */
const validarRuta = (req, res, next) => {
    const { destino, horario, tipo, estado, bus } = req.body;
    const errores = [];

    if (!destino || typeof destino !== 'string' || destino.trim().length < 3 || destino.trim().length > 50) {
        errores.push("El destino es obligatorio (3-50 caracteres).");
    }
    if (!horario || typeof horario !== 'string' || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(horario)) {
        errores.push("El horario es obligatorio y debe tener formato HH:mm.");
    }
    if (!['Normal', 'Expreso'].includes(tipo)) {
        errores.push("El tipo de ruta debe ser 'Normal' o 'Expreso'.");
    }
    if (!['Disponible', 'Mantenimiento'].includes(estado)) {
        errores.push("El estado debe ser 'Disponible' o 'Mantenimiento'.");
    }
    if (!bus || typeof bus !== 'string' || bus.trim().length === 0) {
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

/**
 * GET /
 * Ruta raíz para verificar el estado del servidor
 */
app.get('/', (req, res) => {
    res.send('<h1>Servidor API Funcionando</h1><p>Consulta los datos en: <a href="/api/rutas">/api/rutas</a></p>');
});

/**
 * GET /api/rutas
 * Lista todos los registros de rutas
 */
app.get('/api/rutas', (req, res) => {
    try {
        console.log('Petición recibida en GET /api/rutas');
        res.status(200).json({ estado: "exito", datos: rutas });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ estado: "error", mensaje: "Error al obtener las rutas" });
    }
});

/**
 * POST /api/rutas
 * Crea una nueva ruta con validación
 */
app.post('/api/rutas', validarRuta, (req, res) => {
    const nuevaRuta = {
        id: rutas.length > 0 ? Math.max(...rutas.map(r => r.id)) + 1 : 1,
        ...req.body
    };
    rutas.push(nuevaRuta);
    res.status(201).json({ estado: "exito", mensaje: "Ruta creada correctamente", datos: nuevaRuta });
});

/**
 * PUT /api/rutas/:id
 * Actualiza una ruta existente con validación
 */
app.put('/api/rutas/:id', validarRuta, (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ 
            estado: "error", 
            mensaje: "ID de ruta inválido" 
        });
    }

    const index = rutas.findIndex(r => r.id === id);
    if (index !== -1) {
        rutas[index] = { ...rutas[index], ...req.body, id };
        res.json({ estado: "exito", mensaje: "Ruta actualizada", datos: rutas[index] });
    } else {
        res.status(404).json({ estado: "error", mensaje: "Ruta no encontrada" });
    }
});

/**
 * DELETE /api/rutas/:id
 * Elimina una ruta
 */
app.delete('/api/rutas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const longitudInicial = rutas.length;
    rutas = rutas.filter(r => r.id !== id);
    
    if (rutas.length < longitudInicial) {
        res.status(200).json({ estado: "exito", mensaje: "Ruta eliminada" });
    } else {
        res.status(404).json({ estado: "error", mensaje: "Ruta no encontrada" });
    }
});
/**Metodo para errores en caso de no encontrar el recurso */
app.use((req, res) => {
    res.status(404).json({
        estado: "error",
        mensaje: "Recurso no encontrado",
        detalles: `La ruta '${req.originalUrl}' no existe en este servidor.`
    });
});

app.listen(PORT, () => {
    console.log(`Servidor API corriendo en http://localhost:${PORT}`);
    console.log(`Endpoints disponibles: GET, POST, PUT, DELETE en http://localhost:${PORT}/api/rutas`);
});
