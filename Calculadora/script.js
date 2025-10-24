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
    limpiarError();
    
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
        display.value = numero;
        nuevoNumero = false;
    } else {
        if(display.value === '0') {
            display.value = numero;
        } else {
            display.value += numero;
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
    
    if(operadorActual === '/' && num2 === 0) {
        mostrarError('Error: No se puede dividir por cero');
        limpiarCalculadora();
        return;
    }
    
    switch(operadorActual) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            resultado = num1 / num2;
            break;
        default:
            mostrarError('Error: Operación no válida');
            return;
    }
    
    if(isNaN(resultado) || !isFinite(resultado)) {
        mostrarError('Error: Resultado no válido');
        limpiarCalculadora();
        return;
    }
    
    const operacionCompleta = operacionActual + display.value + ' = ' + resultado;
    
    agregarAlHistorial(operacionCompleta);
    
    display.value = resultado;
    operadorActual = '';
    valorAnterior = '';
    nuevoNumero = true;
    operacionActual = '';
}

function agregarAlHistorial(operacion) {
    const item = document.createElement('div');
    item.classList.add('item-historial');
    item.textContent = operacion;
    
    if(listaHistorial.firstChild) {
        listaHistorial.insertBefore(item, listaHistorial.firstChild);
    } else {
        listaHistorial.appendChild(item);
    }
}

function limpiarCalculadora() {
    display.value = '0';
    operacionActual = '';
    operadorActual = '';
    valorAnterior = '';
    nuevoNumero = true;
}

function mostrarError(mensaje) {
    errorDiv.textContent = mensaje;
    setTimeout(limpiarError, 3000);
}

function limpiarError() {
    errorDiv.textContent = '';
}