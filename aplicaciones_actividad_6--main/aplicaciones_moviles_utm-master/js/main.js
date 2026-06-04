import { cargarRutasDesdeServidor, guardarRuta, eliminarRutaServidor, actualizarRutaServidor, obtenerRutas } from "../module-service.js";
import { renderizarRutas } from "./render.js";
import { aplicarFiltros } from "./filtros.js";

// Función de inicialización
async function iniciarApp() {
    console.log("Iniciando aplicación...");
    const rutasIniciales = await cargarRutasDesdeServidor();
    renderizarRutas(rutasIniciales);

    // Manejo del Formulario
    const form = document.getElementById('formRuta');
    const mensaje = document.getElementById('mensaje');

    if (form) {
        form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nuevaRuta = {
            destino: document.getElementById('destino').value,
            bus: document.getElementById('bus').value,
            horario: document.getElementById('horario').value,
            estado: document.getElementById('estado').value,
            tipo: document.getElementById('tipo').value
        };

        try {
            await guardarRuta(nuevaRuta);
            mensaje.textContent = "¡Ruta guardada con éxito!";
            mensaje.className = "mensaje-exito";
            form.reset();
            
            // Actualizar vista
            renderizarRutas(await cargarRutasDesdeServidor());
        } catch (error) {
            mensaje.textContent = "Error al guardar la ruta.";
            mensaje.className = "mensaje-error";
        }
    });
    }

    // Escuchar clics en botones de las tarjetas (Eliminar y Actualizar)
    const contenedor = document.getElementById('contenedorRutas');
    if (contenedor) {
        contenedor.addEventListener('click', async (e) => {
            const id = parseInt(e.target.dataset.id);
            if (!id) return;

            e.stopPropagation(); // Evita que se abra el detalle al hacer clic en botones

            if (e.target.classList.contains('btn-eliminar')) {
                if (confirm('¿Estás seguro de eliminar esta ruta?')) {
                    await eliminarRutaServidor(id);
                    renderizarRutas(await cargarRutasDesdeServidor());
                }
            }

            if (e.target.classList.contains('btn-estado')) {
                const rutaActual = obtenerRutas().find(r => r.id === id);
                const nuevoEstado = rutaActual.estado === 'Disponible' ? 'Mantenimiento' : 'Disponible';
                
                await actualizarRutaServidor(id, { 
                    ...rutaActual, 
                    estado: nuevoEstado 
                });
                renderizarRutas(await cargarRutasDesdeServidor());
            }
        });
    }
}

iniciarApp();