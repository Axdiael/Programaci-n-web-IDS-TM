import { calcular } from './math.js';
import { agregarAlHistorial } from './storage.js';
import { actualizarDisplay, mostrarError, limpiarError } from './ui.js';

const display = document.getElementById('display');
const botonesContainer = document.getElementById('botones');
const listaHistorial = document.getElementById('lista-historial');
const errorDiv = document.getElementById('error');

let operacionActual = '';
let operadorActual = '';
let valorAnterior = '';
let nuevoNumero = true;

botonesContainer.addEventListener('click', function(e) {
    if(e.target.tagName === 'BUTTON') {
        const valor = e.target.dataset.valor;
        procesarEntrada(valor);
    }
});

document.addEventListener('keydown', function(e) {
    e.preventDefault();
    
    if(e.key >= '0' && e.key <= '9') {
        procesarEntrada(e.key);
    }

    else if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        procesarEntrada(e.key);
    }
    else if(e.key === 'Enter' || e.key === '=') {
        procesarEntrada('=');
    }
    else if(e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        procesarEntrada('C');
    }
});

function procesarEntrada(valor) {
    limpiarError(errorDiv);
    
    if(valor === 'C') {
        limpiarCalculadora();
        return;
    }

    if(!isNaN(valor)) {
        agregarNumero(valor);
        return;
    }
    
    if(valor === '+' || valor === '-' || valor === '*' || valor === '/') {
        agregarOperador(valor);
        return;
    }
    
    if(valor === '=') {
        calcularResultado();
        return;
    }
}

function agregarNumero(numero) {
    if(nuevoNumero) {
        actualizarDisplay(display, numero);
        nuevoNumero = false;
    } else {
        if(display.value === '0') {
            actualizarDisplay(display, numero);
        } else {
            actualizarDisplay(display, display.value + numero);
        }
    }
}

function agregarOperador(operador) {
    if(operadorActual && !nuevoNumero) {
        calcularResultado();
    }
    
    valorAnterior = display.value;
    operadorActual = operador;
    operacionActual = display.value + ' ' + operador + ' ';
    nuevoNumero = true;
}

function calcularResultado() {
    if(!operadorActual || nuevoNumero) {
        return;
    }
    
    const num1 = parseFloat(valorAnterior);
    const num2 = parseFloat(display.value);
    let resultado;
    
    try {
        resultado = calcular(num1, num2, operadorActual);
    } catch(error) {
        mostrarError(errorDiv, 'Error: ' + error.message);
        limpiarCalculadora();
        return;
    }
    
    const operacionCompleta = operacionActual + display.value + ' = ' + resultado;
    
    agregarAlHistorial(operacionCompleta, listaHistorial);
    
    actualizarDisplay(display, resultado);
    operadorActual = '';
    valorAnterior = '';
    nuevoNumero = true;
    operacionActual = '';
}

function limpiarCalculadora() {
    actualizarDisplay(display, '0');
    operacionActual = '';
    operadorActual = '';
    valorAnterior = '';
    nuevoNumero = true;
}