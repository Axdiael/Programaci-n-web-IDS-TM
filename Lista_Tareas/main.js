import { cargarTareas, procesarAgregarTarea, procesarEliminarTarea, procesarToggleTarea } from './tareas.js';

const listaTareas = document.getElementById('lista-tareas');
const inputTarea = document.getElementById('input-tarea');
const btnAgregar = document.getElementById('btn-agregar');

btnAgregar.addEventListener('click', function() {
    procesarAgregarTarea(inputTarea, listaTareas);
});

inputTarea.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        procesarAgregarTarea(inputTarea, listaTareas);
    }
});

window.eliminarTarea = function(id) {
    procesarEliminarTarea(id, listaTareas);
};

window.toggleTarea = function(id) {
    procesarToggleTarea(id, listaTareas);
};

window.onload = function() {
    cargarTareas(listaTareas);
}