// Lógica del Carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
}

function moveSlide(step) {
    currentSlide += step;
    showSlide(currentSlide);
}

// Cambio automático cada 5 segundos
setInterval(() => {
    moveSlide(1);
}, 5000);
