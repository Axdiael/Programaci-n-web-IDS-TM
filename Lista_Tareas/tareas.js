import { guardarEnLocalStorage, cargarDesdeLocalStorage } from './storage.js';
import { renderizarTareas, crearElementoTarea } from './ui.js';

let tareas = [];
let contadorId = 0;

function generarId() {
    contadorId++;
    return contadorId.toString();
}

export function procesarAgregarTarea(inputTarea, listaTareas) {
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
    
    guardarEnLocalStorage(tareas);
    renderizarTareas(tareas, listaTareas);
}

export function procesarEliminarTarea(id, listaTareas) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    guardarEnLocalStorage(tareas);
    renderizarTareas(tareas, listaTareas);
}

export function procesarToggleTarea(id, listaTareas) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.terminada = !tarea.terminada;
        guardarEnLocalStorage(tareas);
        renderizarTareas(tareas, listaTareas);
    }
}

export function cargarTareas(listaTareas) {
    const tareasGuardadas = cargarDesdeLocalStorage();
    
    if (tareasGuardadas) {
        tareas = tareasGuardadas;
        if (tareas.length > 0) {
            const maxId = Math.max(...tareas.map(t => parseInt(t.id)));
            contadorId = maxId;
        }
    } else {
        tareas = [];
    }
    
    renderizarTareas(tareas, listaTareas);
}