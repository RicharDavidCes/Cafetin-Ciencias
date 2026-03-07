
// 1. VARIABLE DE CONTROL
// 'actual' guarda el número de la imagen que se está viendo en este momento.
let actual = 0;

// 2. SELECCIÓN DE ELEMENTOS
// Busca en el HTML todos los elementos que tengan la clase '.desliz_carrusel'
// y los guarda en una lista para poder manipularlos uno por uno.
const deslices = document.querySelectorAll('.desliz_carrusel');

/*
3. FUNCIÓN: MOSTRAR UN DESLIZE ESPECÍFICO (muestraDesliz)
	Esta es la función principal que decide qué se ve y qué no.
	- Primero le quita la clase activo a TODOS los deslices para que ninguno se vea.
	- Luego revisa si llegamos al final de la lista: 
	Si el índice es mayor al total, vuelve al inicio (0).
	Si el índice es menor a cero, salta al último elemento.
	- Finalmente a la imagen que corresponde (la actual), le pone la clase activo 
	para que el CSS se encargue de mostrarla.
*/
function muestraDesliz(indice) {
    deslices.forEach(desliz => desliz.classList.remove('activo'));
    
    if (indice >= deslices.length) actual = 0;
    if (indice < 0) actual = deslices.length - 1;
    
    deslices[actual].classList.add('activo');
}

/*
	4. FUNCIÓN: MOVER EL CARRUSEL (mueveDesliz)
	Esta función es un empujón. Recibe un número (salto), se lo suma 
	a la posición actual y llama a la función anterior para actualizar la vista.
*/
function mueveDesliz(salto) {
    actual += salto;
    muestraDesliz(actual);
}

/*
	5. TEMPORIZADOR AUTOMÁTICO (setInterval)
	se encarga de que Cada 5000 milisegundos (5 segundos)
	se ejecute la función mueveDesliz(1)".
	Esto hace que el carrusel avance solo, infinitamente.
*/
setInterval(() => {
    mueveDesliz(1);
}, 5000);