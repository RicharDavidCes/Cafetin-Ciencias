const productos = [
    { id: 1, nombre: "Empanada Operada", precio: 2.50, icono: "🥟" },
    { id: 2, nombre: "Café con Leche", precio: 1.50, icono: "☕" },
    { id: 3, nombre: "Jugo Natural", precio: 2.00, icono: "🥤" },
    { id: 4, nombre: "Sandwich Ciencias", precio: 4.50, icono: "🥪" },
    { id: 5, nombre: "Tizana", precio: 1.50, icono: "🍹" }
];

let carrito = [];
let historialCompras = [
    { fecha: "15/02/2026", detalles: "2x Empanada de Queso, 1x Café Grande", total: "$7.50" }
];

// --- FUNCIONES DE NAVEGACIÓN ---

function toggleCarrito() {
    const drawer = document.getElementById('carrito_drawer');
    const overlay = document.getElementById('carrito_overlay');
    drawer.classList.toggle('active');
    overlay.style.display = drawer.classList.contains('active') ? 'block' : 'none';
}

// --- LÓGICA DEL CATÁLOGO ---

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

// --- LÓGICA DEL CARRITO ---

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarInterfazCarrito();
}

function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarInterfazCarrito();
}

/**
 * Nueva función: vaciarCarrito
 * Borra todos los elementos del carrito actual.
 */
function vaciarCarrito() {
    if (carrito.length === 0) return;
    
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        carrito = [];
        actualizarInterfazCarrito();
    }
}

function actualizarInterfazCarrito() {
    const lista = document.getElementById('items_carrito');
    const conteo = document.getElementById('conteo_carrito');
    const conteoF = document.getElementById('conteo_flotante');
    const totalS = document.getElementById('total_carrito');
    
    lista.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="mensaje_vacio" style="text-align:center; padding:20px; color:#666;">Tu carrito está vacío</p>';
    } else {
        carrito.forEach((item, i) => {
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.alignItems = 'center';
            div.style.marginBottom = '10px';
            div.style.padding = '5px 0';
            div.style.borderBottom = '1px solid #eee';
            div.innerHTML = `
                <span>${item.nombre}</span>
                <div>
                    <span style="font-weight:bold; margin-right:10px;">$${item.precio.toFixed(2)}</span>
                    <button onclick="eliminarDelCarrito(${i})" style="border:none; background:none; cursor:pointer; font-size:1.2rem;">🗑️</button>
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

// --- LÓGICA DE PEDIDOS Y HISTORIAL ---

function finalizarPedido() {
    if (carrito.length === 0) return alert("El carrito está vacío. ¡Agrega algo rico!");

    const nuevaCompra = {
        fecha: new Date().toLocaleDateString(),
        detalles: carrito.map(p => p.nombre).join(", "),
        total: document.getElementById('total_carrito').innerText
    };

    historialCompras.push(nuevaCompra);
    carrito = []; // Limpiamos el carrito tras la compra
    actualizarInterfazCarrito();
    actualizarTablaHistorial();
    toggleCarrito();
    alert("¡Pedido realizado con éxito! Gracias por tu compra.");
}

function actualizarTablaHistorial() {
    const cuerpo = document.getElementById('cuerpo_historial');
    if(!cuerpo) return;
    cuerpo.innerHTML = '';
    
    // Mostramos el historial del más reciente al más antiguo
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

// --- INICIALIZACIÓN ---

window.onload = () => {
    cargarCatalogo();
    actualizarTablaHistorial();
};