
const btnRojo = document.getElementById('btnRojo');
const btnVerde = document.getElementById('btnVerde');
const btnAzul = document.getElementById('btnAzul');
const btnRestablecer = document.getElementById('btnRestablecer');
const container = document.getElementById('container');
const body = document.body;

function cambiarColor(colorFondo, colorContainer) {
    body.style.backgroundColor = colorFondo;
    container.style.backgroundColor = colorContainer;
}

btnRojo.addEventListener('click', function() {
    cambiarColor('red', '#ffcccc');
});

btnVerde.addEventListener('click', function() {
    cambiarColor('green', '#ccffcc');
});

btnAzul.addEventListener('click', function() {
    cambiarColor('blue', '#cce5ff');
});

btnRestablecer.addEventListener('click', function() {
    cambiarColor('white', 'white');
});