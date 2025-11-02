export function actualizarDisplay(display, valor) {
    display.value = valor;
}

export function mostrarError(errorDiv, mensaje) {
    errorDiv.textContent = mensaje;
    setTimeout(() => limpiarError(errorDiv), 3000);
}

export function limpiarError(errorDiv) {
    errorDiv.textContent = '';
}