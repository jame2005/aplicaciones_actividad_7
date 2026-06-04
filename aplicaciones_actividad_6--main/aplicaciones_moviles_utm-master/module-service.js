const API_URL = 'http://localhost:3000/api/rutas';
let cacheRutas = [];

export async function cargarRutasDesdeServidor() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        cacheRutas = await response.json();
        console.log("Rutas cargadas con éxito:", cacheRutas);
        return cacheRutas;
    } catch (error) {
        console.error("Error al cargar rutas:", error);
        return [];
    }
}

export function obtenerRutas() {
    return cacheRutas;
}

export async function guardarRuta(ruta) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ruta)
        });
        const nuevaRuta = await response.json();
        cacheRutas.push(nuevaRuta);
        return nuevaRuta;
    } catch (error) {
        throw new Error("No se pudo guardar la ruta");
    }
}

export async function actualizarRutaServidor(id, datosActualizados) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosActualizados)
        });
        const rutaEditada = await response.json();
        cacheRutas = cacheRutas.map(r => r.id === id ? rutaEditada : r);
        return rutaEditada;
    } catch (error) {
        console.error("Error al actualizar:", error);
        throw error;
    }
}

export async function eliminarRutaServidor(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        cacheRutas = cacheRutas.filter(r => r.id !== id);
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}