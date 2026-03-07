// 1. EL MENÚ DEL DÍA
// Aquí están los productos con su nombre, precio y un emoji para que se vea bien.
const productos = [
    { id: 1, nombre: "Empanada Operada", precio: 2.50, icono: "🥟" },
    { id: 2, nombre: "Café con Leche", precio: 1.50, icono: "☕" },
    { id: 3, nombre: "Jugo Natural", precio: 2.00, icono: "🥤" },
    { id: 4, nombre: "Sandwich Ciencias", precio: 4.50, icono: "🥪" },
    { id: 5, nombre: "Tizana", precio: 1.50, icono: "🍹" }
];

// 2. MEMORIA TEMPORAL
let carrito = []; // Lo que estás eligiendo ahorita.
let historialCompras = [ // Una compra de prueba para que el historial no aparezca vacío.
    { fecha: "15/02/2026", detalles: "2x Empanada de Queso, 1x Café Grande", total: "$7.50" }
];

// 3. ABRIR Y CERRAR EL CARRITO (toggleCarrito)
// Esta función hace que el panel del carrito salga por un lado de la pantalla
// y pone un fondo oscuro (overlay) para que resalte.
function toggleCarrito() {
    const drawer = document.getElementById('carrito_drawer');
    const overlay = document.getElementById('carrito_overlay');
    drawer.classList.toggle('active');
    overlay.style.display = drawer.classList.contains('active') ? 'block' : 'none';
}

// 4. MOSTRAR EL CATÁLOGO (cargarCatalogo)
// Recorre la lista de productos y crea "tarjetas" visuales en el HTML.
// Cada tarjeta tiene su icono, nombre, precio y el botón para comprar.
function cargarCatalogo() {
    const grid = document.getElementById('cuadricula_productos');
    if(!grid) return;
    grid.innerHTML = '';
    productos.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'tarjeta_producto';
        card.innerHTML = `
            <div class="icono_prod">${prod.icono}</div>
            <h4>${prod.nombre}</h4>
            <p>$${prod.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${prod.id})" class="boton_agregar">Añadir</button>
        `;
        grid.appendChild(card);
    });
}

// 5. MANEJO DEL CARRITO
// Añade un producto a la lista y actualiza los numeritos de la pantalla.
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarInterfazCarrito();
}

// Borra un producto específico usando su posición en la lista.
function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarInterfazCarrito();
}

// Borra TODO lo que tengas en el carrito, pero primero te pregunta si estás seguro.
function vaciarCarrito() {
    if (carrito.length === 0) return;
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        carrito = [];
        actualizarInterfazCarrito();
    }
}

// 6. DIBUJAR EL CARRITO (actualizarInterfazCarrito)
// Esta función limpia el panel del carrito y lo vuelve a llenar con lo que has elegido.
// También suma los precios para darte el total y actualiza los contadores de la interfaz.
function actualizarInterfazCarrito() {
    const lista = document.getElementById('items_carrito');
    const conteo = document.getElementById('conteo_carrito');
    const conteoF = document.getElementById('conteo_flotante');
    const totalS = document.getElementById('total_carrito');
    
    lista.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="mensaje_vacio">Tu carrito está vacío</p>';
    } else {
        carrito.forEach((item, i) => {
            const div = document.createElement('div');
            div.className = 'item_en_carrito'; // (Estilos aplicados directamente en el JS)
            div.innerHTML = `
                <span>${item.nombre}</span>
                <div>
                    <span class="precio_item">$${item.precio.toFixed(2)}</span>
                    <button onclick="eliminarDelCarrito(${i})">🗑️</button>
                </div>
            `;
            lista.appendChild(div);
            total += item.precio;
        });
    }

    conteo.innerText = carrito.length;
    conteoF.innerText = carrito.length;
    totalS.innerText = `$${total.toFixed(2)}`;
}

// 7. FINALIZAR COMPRA Y HISTORIAL
// Cuando le das a "Pedir" guarda la compra en el historial, limpia el carrito
// y te avisa que todo salió bien.
function finalizarPedido() {
    if (carrito.length === 0) return alert("El carrito está vacío. ¡Agrega algo rico!");

    const nuevaCompra = {
        fecha: new Date().toLocaleDateString(),
        detalles: carrito.map(p => p.nombre).join(", "),
        total: document.getElementById('total_carrito').innerText
    };

    historialCompras.push(nuevaCompra);
    carrito = []; 
    actualizarInterfazCarrito();
    actualizarTablaHistorial();
    toggleCarrito(); // Cierra el panel al terminar.
    alert("¡Pedido realizado con éxito!");
}

// Toma el historial de compras y lo pone en una tabla, mostrando lo último que compraste de primero.
function actualizarTablaHistorial() {
    const cuerpo = document.getElementById('cuerpo_historial');
    if(!cuerpo) return;
    cuerpo.innerHTML = '';
    
    [...historialCompras].reverse().forEach(c => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${c.fecha}</td>
            <td>${c.detalles}</td>
            <td style="font-weight:bold;">${c.total}</td>
        `;
        cuerpo.appendChild(fila);
    });
}

// 8. ARRANCAR TODO
// Apenas abre la página, carga los productos y el historial.
window.onload = () => {
    cargarCatalogo();
    actualizarTablaHistorial();
};