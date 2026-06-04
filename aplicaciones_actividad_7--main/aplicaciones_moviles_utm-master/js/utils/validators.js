// Valida campos vacíos
export function esCampoVacio(valor) {
    return !valor || valor.trim() === "";
}

// Valida longitud de texto
export function validarLongitud(texto, min, max) {
    const longitud = texto.trim().length;
    return longitud >= min && longitud <= max;
}

// Valida formato de hora (HH:mm)
export function validarFormatoHorario(horario) {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(horario);
}

// Limpia y valida texto
export function validarTexto(texto) {
    if (!texto) {
        return "";
    }
    return texto.trim();
}
