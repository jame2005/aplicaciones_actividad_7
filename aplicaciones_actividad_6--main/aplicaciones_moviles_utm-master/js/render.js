export function renderizarRutas(rutas) {
    const contenedor = document.getElementById('contenedorRutas');
    const contador = document.getElementById('contadorRutas');
    
    if (!contenedor) return;
    
    contador.textContent = rutas.length;
    contenedor.innerHTML = '';

    if (rutas.length === 0) {
        contenedor.innerHTML = '<p class="estado-vacio">No hay rutas disponibles.</p>';
        return;
    }

    rutas.forEach(ruta => {
        const card = document.createElement('div');
        card.className = `tarjeta ${ruta.estado === 'Mantenimiento' ? 'tarjeta--mantenimiento' : ''}`;
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <h3 class="tarjeta__titulo">${ruta.destino}</h3>
            <p class="tarjeta__info"><strong>Bus:</strong> ${ruta.bus}</p>
            <p class="tarjeta__info"><strong>Horario:</strong> ${ruta.horario}</p>
            <div class="tarjeta__badges">
                <span class="badge ${ruta.tipo === 'Expreso' ? 'tipo-expreso' : 'tipo-ruta'}">${ruta.tipo}</span>
                <span class="badge ${ruta.estado === 'Disponible' ? 'estado-disponible' : 'estado-mantenimiento'}">${ruta.estado}</span>
            </div>
            <div class="tarjeta__acciones mt-sm">
                <button class="btn btn--sm btn--secondary btn-estado" data-id="${ruta.id}">Alternar Estado</button>
                <button class="btn btn--sm btn--danger btn-eliminar" data-id="${ruta.id}">Eliminar</button>
            </div>
        `;
        
        card.addEventListener('click', () => mostrarDetalleRuta(ruta));
        contenedor.appendChild(card);
    });
}

export function mostrarDetalleRuta(ruta) {
    const detalleContenedor = document.getElementById('detalleRuta');
    if (!detalleContenedor) return;

    detalleContenedor.classList.add('activo');
    detalleContenedor.innerHTML = `
        <div class="detalle-contenido">
            <h3>${ruta.destino}</h3>
            <div class="detalle-campo"><strong>Bus:</strong> <span>${ruta.bus}</span></div>
            <div class="detalle-campo"><strong>Horario:</strong> <span>${ruta.horario}</span></div>
            <div class="detalle-campo"><strong>Tipo:</strong> <span>${ruta.tipo}</span></div>
            <div class="detalle-campo"><strong>Estado:</strong> <span>${ruta.estado}</span></div>
            <button id="btnCerrarDetalle" class="btn btn--sm btn--ghost mt-md">Cerrar Detalle</button>
        </div>
    `;

    document.getElementById('btnCerrarDetalle').addEventListener('click', () => {
        detalleContenedor.classList.remove('activo');
        detalleContenedor.innerHTML = '<p>Selecciona una ruta para ver más detalles.</p>';
    });
}