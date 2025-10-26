let tareas = [];
const listaTareas = document.getElementById('lista-tareas');
const inputTarea = document.getElementById('input-tarea');
let contadorId = 0;

function generarId() {
    contadorId++;
    return contadorId.toString();
}

function agregarTarea() {
    const textoTarea = inputTarea.value.trim();
    
    if (textoTarea === '') {
        alert('ingresa una tarea');
        return;
    }

    const nuevaTarea = {
        id: generarId(),
        texto: textoTarea,
        terminada: false
    };

    tareas.push(nuevaTarea);
    inputTarea.value = '';
    
    guardarEnLocalStorage();
    renderizarTareas();
}

function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    guardarEnLocalStorage();
    renderizarTareas();
}

function toggleTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.terminada = !tarea.terminada;
        guardarEnLocalStorage();
        renderizarTareas();
    }
}

function crearElementoTarea(tarea) {
    const li = document.createElement('li');
    li.className = 'tarea-item';
    li.id = tarea.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarea.terminada;
    checkbox.className = 'checkbox-tarea';
    checkbox.addEventListener('change', (e) => {
        const idTarea = e.target.parentElement.id;
        toggleTarea(idTarea);
    });

    const textoSpan = document.createElement('span');
    textoSpan.textContent = tarea.texto;
    textoSpan.className = tarea.terminada ? 'texto-tarea terminada' : 'texto-tarea';

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.onclick = () => eliminarTarea(tarea.id);

    li.appendChild(checkbox);
    li.appendChild(textoSpan);
    li.appendChild(btnEliminar);

    return li;
}

function renderizarTareas() {
    listaTareas.innerHTML = '';
    
    tareas.forEach(tarea => {
        const elementoTarea = crearElementoTarea(tarea);
        listaTareas.appendChild(elementoTarea);
    });
}

function guardarEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
    } else {
        tareas = [];
    }
    
    renderizarTareas();
}

inputTarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});

window.onload = function() {
    cargarTareas();
}