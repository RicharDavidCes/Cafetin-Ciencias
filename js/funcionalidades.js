let actual = 0;
const deslices = document.querySelectorAll('.desliz_carrusel');

function muestraDesliz(indice) {
    deslices.forEach(desliz => desliz.classList.remove('activo'));
    
    if (indice >= deslices.length) actual = 0;
    if (indice < 0) actual = deslices.length - 1;
    
    deslices[actual].classList.add('activo');
}

function mueveDesliz(salto) {
    actual += salto;
    muestraDesliz(actual);
}

setInterval(() => {
    mueveDesliz(1);
}, 5000);
