import { obtenerRutas } from "../../module-service.js";
import { validarTexto } from "../utils/validators.js";

/**
 * Renderiza todas las rutas en tarjetas
 * @param {Array} lista
 */
export function renderizarRutas(lista) {

    const contenedorRutas = document.getElementById("contenedorRutas");

    if (!contenedorRutas) {
        console.error("No existe contenedorRutas");
        return;
    }

    contenedorRutas.innerHTML = "";

    // Estado vacío
    if (lista.length === 0) {
        contenedorRutas.innerHTML =
            "<p>No existen rutas registradas.</p>";
        return;
    }

    // Renderizar tarjetas
    lista.forEach(ruta => {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        
        if (ruta.estado === "Mantenimiento") {
            tarjeta.classList.add("tarjeta--mantenimiento");
        }

        tarjeta.innerHTML = `
            <h3>${validarTexto(ruta.destino)}</h3>

            <p><strong>Bus:</strong> ${ruta.bus}</p>

            <p><strong>Horario:</strong> ${ruta.horario}</p>

            <span class="badge ${
                ruta.estado === "Disponible"
                    ? "estado-disponible"
                    : "estado-mantenimiento"
            }">
                ${ruta.estado}
            </span>

            <span class="badge tipo-ruta">
                ${ruta.tipo}
            </span>

            <div class="tarjeta__acciones">
                <button class="btn-detalle btn--sm" data-id="${ruta.id}">
                    Detalles
                </button>
                <button class="btn-estado btn--sm btn--secondary" data-id="${ruta.id}">
                    Estado
                </button>
                <button class="btn-eliminar btn--sm btn--danger" data-id="${ruta.id}">
                    Eliminar
                </button>
            </div>
        `;

        // Evento botón detalle
        tarjeta
            .querySelector(".btn-detalle")
            .addEventListener("click", () => {
                mostrarDetalles(ruta.id);
            });

        contenedorRutas.appendChild(tarjeta);
    });

    // Contador opcional (mejora UX)
    const contador = document.getElementById("contadorRutas");

    if (contador) {
        contador.textContent = lista.length;
    }
}

/**
 * Muestra detalle de una ruta
 * @param {number} id
 */
export function mostrarDetalles(id) {

    const rutas = obtenerRutas();
    const ruta = rutas.find(r => r.id === id);

    const detalleRuta =
        document.getElementById("detalleRuta");

    if (!ruta || !detalleRuta) {
        return;
    }

    detalleRuta.innerHTML = `
        <h2>${ruta.destino}</h2>

        <p><strong>Bus:</strong>
        ${ruta.bus}</p>

        <p><strong>Horario:</strong>
        ${ruta.horario}</p>

        <p><strong>Estado:</strong>
        ${ruta.estado}</p>

        <p><strong>Tipo:</strong>
        ${ruta.tipo}</p>

        <button id="btnCerrarDetalle">
            Cerrar
        </button>
    `;

    document
        .getElementById("btnCerrarDetalle")
        .addEventListener(
            "click",
            cerrarDetalles
        );
}

/**
 * Limpia panel detalle
 */
export function cerrarDetalles() {

    const detalleRuta =
        document.getElementById("detalleRuta");

    detalleRuta.innerHTML = `
        <p>
            Seleccione una ruta para visualizar
            su información.
        </p>
    `;
}
