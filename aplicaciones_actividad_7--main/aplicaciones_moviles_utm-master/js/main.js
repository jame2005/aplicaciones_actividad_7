import { cargarRutasDesdeServidor, guardarRuta, eliminarRutaServidor, actualizarRutaServidor, obtenerRutas } from "../module-service.js";
import { renderizarRutas } from "./ui/render.js";
import { aplicarFiltros } from "./filtros.js";
import { esCampoVacio, validarLongitud, validarFormatoHorario } from "./utils/validators.js";

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
        
        // Validación en el Cliente (UX mejorada)
        const errores = [];
        if (!validarLongitud(nuevaRuta.destino, 3, 50)) errores.push("Destino debe tener entre 3 y 50 caracteres.");
        if (esCampoVacio(nuevaRuta.bus)) errores.push("El nombre del bus es obligatorio.");
        if (!validarFormatoHorario(nuevaRuta.horario)) errores.push("Formato de horario inválido (HH:mm).");

        if (errores.length > 0) {
            mensaje.textContent = errores.join(" | ");
            mensaje.className = "mensaje-error";
            return;
        }

        try {
            mensaje.textContent = "Guardando...";
            mensaje.className = "mensaje-info";
            
            await guardarRuta(nuevaRuta);
            
            mensaje.textContent = "¡Ruta guardada con éxito!";
            mensaje.className = "mensaje-exito";
            form.reset();
            
            // Actualizar vista
            renderizarRutas(await cargarRutasDesdeServidor());

            // Limpiar mensaje después de 3 segundos
            setTimeout(() => {
                mensaje.textContent = "";
                mensaje.className = "";
            }, 3000);
        } catch (error) {
            // Aquí manejamos la respuesta estructurada del servidor (res.detalles)
            mensaje.textContent = error.message || "Error al conectar con el servidor.";
            mensaje.className = "mensaje-error";
        }
    });
    }

    // Escuchar clics en botones de las tarjetas (Eliminar y Actualizar)
    const contenedor = document.getElementById('contenedorRutas');
    if (contenedor) {
        contenedor.addEventListener('click', async (e) => {
            const id = parseInt(e.target.dataset.id);
            const mensaje = document.getElementById('mensaje');
            if (!id) return;

            e.stopPropagation(); // Evita que se abra el detalle al hacer clic en botones

            try {
                if (e.target.classList.contains('btn-eliminar')) {
                    if (confirm('¿Estás seguro de eliminar esta ruta?')) {
                        await eliminarRutaServidor(id);
                        mensaje.textContent = "Ruta eliminada con éxito";
                        mensaje.className = "mensaje-exito";
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
                    mensaje.textContent = "Estado actualizado";
                    mensaje.className = "mensaje-exito";
                    renderizarRutas(await cargarRutasDesdeServidor());
                }
                
                setTimeout(() => {
                    if (mensaje) mensaje.textContent = "";
                }, 2000);

            } catch (error) {
                mensaje.textContent = "Error: " + error.message;
                mensaje.className = "mensaje-error";
            }
        });
    }
}

iniciarApp();
