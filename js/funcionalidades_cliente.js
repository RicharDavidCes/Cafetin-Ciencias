// Datos iniciales de productos
const productos = [
    { id: 1, nombre: "Empanada Operada", precio: 2.50, icono: "🥟" },
    { id: 2, nombre: "Café con Leche", precio: 1.50, icono: "☕" },
    { id: 3, nombre: "Jugo Natural", precio: 2.00, icono: "🥤" },
    { id: 4, nombre: "Sandwich Ciencias", precio: 4.50, icono: "🥪" }
];

let carrito = [];

// Cargar catálogo
function cargarCatalogo() {
    const grid = document.getElementById('product-grid');
    productos.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="prod-icon">${prod.icono}</div>
            <h4>${prod.nombre}</h4>
            <p>$${prod.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${prod.id})" class="btn-add">Añadir a Carrito</button>
        `;
        grid.appendChild(card);
    });
}

// Lógica del Carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    const cartList = document.getElementById('cart-items');
    const countSpan = document.getElementById('cart-count');
    const totalSpan = document.getElementById('cart-total');
    
    cartList.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        cartList.innerHTML = '<p class="empty-msg">Tu carrito está vacío</p>';
    } else {
        carrito.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span>${item.nombre}</span>
                <span>$${item.precio.toFixed(2)}</span>
            `;
            cartList.appendChild(div);
            total += item.precio;
        });
    }

    countSpan.innerText = carrito.length; // Contador de cantidad
    totalSpan.innerText = `$${total.toFixed(2)}`; // Cálculo de subtotal
}

// Botón de Logout
document.getElementById('btnLogout').addEventListener('click', () => {
    localStorage.removeItem('usuarioActivo');
    window.location.href = 'login.html';
});

// Inicializar
window.onload = cargarCatalogo;

// ... (mantenemos la lista de productos y la variable carrito igual)

// Lógica para agregar (se mantiene igual)
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarInterfazCarrito();
}

// NUEVA FUNCIÓN: Eliminar del carrito
function eliminarDelCarrito(index) {
    // Eliminamos el elemento en la posición específica del array
    carrito.splice(index, 1);
    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    const cartList = document.getElementById('cart-items');
    const countSpan = document.getElementById('cart-count');
    const totalSpan = document.getElementById('cart-total');
    
    cartList.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        cartList.innerHTML = '<p class="empty-msg">Tu carrito está vacío</p>';
    } else {
        // Al recorrer el carrito, usamos el 'index' para saber cuál eliminar
        carrito.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="cart-item-info">
                    <span>${item.nombre}</span>
                    <span class="price">$${item.precio.toFixed(2)}</span>
                </div>
                <button onclick="eliminarDelCarrito(${index})" class="btn-remove" title="Quitar producto">🗑️</button>
            `;
            cartList.appendChild(div);
            total += item.precio;
        });
    }

    countSpan.innerText = carrito.length;
    totalSpan.innerText = `$${total.toFixed(2)}`;
}

function vaciarCarrito() {
    if (carrito.length > 0) {
        if (confirm("¿Seguro que quieres vaciar todo el carrito?")) {
            carrito = [];
            actualizarInterfazCarrito();
        }
    }
}

// Variable para el historial (se reinicia al refrescar la página)
let historialCompras = [
    { fecha: "15/02/2026", detalles: "2x Empanada de Queso, 1x Café Grande", total: "$7.50" }
];

// Función para finalizar el pedido
function finalizarPedido() {
    if (carrito.length === 0) {
        alert("¡Tu carrito está vacío! Agrega algo antes de comprar.");
        return;
    }

    // 1. Calculamos el total y creamos el resumen de nombres
    let totalPedido = 0;
    const nombresProductos = carrito.map(p => {
        totalPedido += p.precio;
        return p.nombre;
    });

    // 2. Creamos el objeto de la nueva compra
    const nuevaCompra = {
        fecha: new Date().toLocaleDateString(), // Fecha actual del sistema
        detalles: nombresProductos.join(", "),
        total: `$${totalPedido.toFixed(2)}`
    };

    // 3. Lo añadimos al historial
    historialCompras.push(nuevaCompra);

    // 4. Limpiamos el carrito y actualizamos todo
    carrito = [];
    actualizarInterfazCarrito();
    actualizarTablaHistorial();

    alert("✅ ¡Pedido finalizado con éxito! Revisa tu historial.");
}

// Función para renderizar la tabla de historial
function actualizarTablaHistorial() {
    const historyBody = document.getElementById('history-body');
    historyBody.innerHTML = ''; // Limpiamos la tabla

    // Recorremos el historial de atrás hacia adelante para ver lo más nuevo arriba
    [...historialCompras].reverse().forEach(compra => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${compra.fecha}</td>
            <td>${compra.detalles}</td>
            <td><strong>${compra.total}</strong></td>
        `;
        historyBody.appendChild(row);
    });
}

// Modifica tu window.onload para que también cargue el historial inicial
window.onload = () => {
    cargarCatalogo();
    actualizarTablaHistorial();
};