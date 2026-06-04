const API_URL = 'http://localhost:3000/api/rutas';
let cacheRutas = [];

export async function cargarRutasDesdeServidor() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        const res = await response.json();
        cacheRutas = res.datos || [];
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
        const res = await response.json();
        if (res.estado === 'exito') {
            cacheRutas.push(res.datos);
            return res.datos;
        } else {
            throw new Error(res.detalles ? res.detalles.join(", ") : res.mensaje);
        }
    } catch (error) {
        throw error;
    }
}

export async function actualizarRutaServidor(id, datosActualizados) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosActualizados)
        });
        const res = await response.json();
        if (res.estado === 'exito') {
            cacheRutas = cacheRutas.map(r => r.id === id ? res.datos : r);
            return res.datos;
        } else {
            throw new Error(res.detalles ? res.detalles.join(", ") : res.mensaje);
        }
    } catch (error) {
        console.error("Error al actualizar:", error);
        throw error;
    }
}

export async function eliminarRutaServidor(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        const res = await response.json();
        if (res.estado === 'exito') {
            cacheRutas = cacheRutas.filter(r => r.id !== id);
        } else {
            throw new Error(res.mensaje || "No se pudo eliminar");
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}