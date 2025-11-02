export function crearElementoTarea(tarea) {
    const li = document.createElement('li');
    li.className = 'tarea-item';
    li.id = tarea.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarea.terminada;
    checkbox.className = 'checkbox-tarea';
    checkbox.addEventListener('change', (e) => {
        const idTarea = e.target.parentElement.id;
        window.toggleTarea(idTarea);
    });

    const textoSpan = document.createElement('span');
    textoSpan.textContent = tarea.texto;
    textoSpan.className = tarea.terminada ? 'texto-tarea terminada' : 'texto-tarea';

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.onclick = () => window.eliminarTarea(tarea.id);

    li.appendChild(checkbox);
    li.appendChild(textoSpan);
    li.appendChild(btnEliminar);

    return li;
}

export function renderizarTareas(tareas, listaTareas) {
    listaTareas.innerHTML = '';
    
    tareas.forEach(tarea => {
        const elementoTarea = crearElementoTarea(tarea);
        listaTareas.appendChild(elementoTarea);
    });
}