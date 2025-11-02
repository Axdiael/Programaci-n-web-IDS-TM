export function calcular(num1, num2, operador) {
    let resultado;
    
    if(operador === '/' && num2 === 0) {
        throw new Error('No se puede dividir por cero');
    }
    
    switch(operador) {
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
            throw new Error('Operación no válida');
    }
    
    if(isNaN(resultado) || !isFinite(resultado)) {
        throw new Error('Resultado no válido');
    }
    
    return resultado;
}