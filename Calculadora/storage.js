export function agregarAlHistorial(operacion, listaHistorial) {
    const item = document.createElement('div');
    item.classList.add('item-historial');
    item.textContent = operacion;
    
    if(listaHistorial.firstChild) {
        listaHistorial.insertBefore(item, listaHistorial.firstChild);
    } else {
        listaHistorial.appendChild(item);
    }
}