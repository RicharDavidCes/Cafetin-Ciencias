const productos = [
    { id: 1, nombre: "Empanada Operada", precio: 2.50, icono: "🥟" },
    { id: 2, nombre: "Café con Leche", precio: 1.50, icono: "☕" },
    { id: 3, nombre: "Jugo Natural", precio: 2.00, icono: "🥤" },
    { id: 4, nombre: "Sandwich Ciencias", precio: 4.50, icono: "🥪" }
];

let carrito = [];

function cargarCatalogo() {
    const grid = document.getElementById('cuadricula_productos');
    productos.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'tarjeta_producto';
        card.innerHTML = `
            <div class="icono_prod">${prod.icono}</div>
            <h4>${prod.nombre}</h4>
            <p>$${prod.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${prod.id})" class="boton_agregar">Añadir a Carrito</button>
        `;
        grid.appendChild(card);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarInterfazCarrito();
}

function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    const listaCarrito = document.getElementById('items_carrito');
    const spanConteo = document.getElementById('conteo_carrito');
    const spanTotal = document.getElementById('total_carrito');
    
    listaCarrito.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p class="mensaje_vacio">Tu carrito está vacío</p>';
    } else {
        carrito.forEach((item, indice) => {
            const div = document.createElement('div');
            div.className = 'item_carrito';
            div.innerHTML = `
                <div class="info_item_carrito">
                    <span>${item.nombre}</span>
                    <span class="precio">$${item.precio.toFixed(2)}</span>
                </div>
                <button onclick="eliminarDelCarrito(${indice})" class="boton_eliminar" title="Quitar producto">🗑️</button>
            `;
            listaCarrito.appendChild(div);
            total += item.precio;
        });
    }

    spanConteo.innerText = carrito.length;
    spanTotal.innerText = `$${total.toFixed(2)}`;
}

function vaciarCarrito() {
    if (carrito.length > 0) {
        if (confirm("¿Seguro que quieres vaciar todo el carrito?")) {
            carrito = [];
            actualizarInterfazCarrito();
        }
    }
}

let historialCompras = [
    { fecha: "15/02/2026", detalles: "2x Empanada de Queso, 1x Café Grande", total: "$7.50" }
];

function finalizarPedido() {
    if (carrito.length === 0) {
        alert("¡Tu carrito está vacío! Agrega algo antes de comprar.");
        return;
    }

    let totalPedido = 0;
    const nombresProductos = carrito.map(p => {
        totalPedido += p.precio;
        return p.nombre;
    });

    const nuevaCompra = {
        fecha: new Date().toLocaleDateString(),
        detalles: nombresProductos.join(", "),
        total: `$${totalPedido.toFixed(2)}`
    };

    historialCompras.push(nuevaCompra);
    carrito = [];
    actualizarInterfazCarrito();
    actualizarTablaHistorial();

    alert("Pedido finalizado con éxito. Revisa tu historial.");
}

function actualizarTablaHistorial() {
    const cuerpoHistorial = document.getElementById('cuerpo_historial');
    cuerpoHistorial.innerHTML = '';

    [...historialCompras].reverse().forEach(compra => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${compra.fecha}</td>
            <td>${compra.detalles}</td>
            <td><strong>${compra.total}</strong></td>
        `;
        cuerpoHistorial.appendChild(row);
    });
}

document.getElementById('boton_cerrar_sesion').addEventListener('click', () => {
    localStorage.removeItem('usuarioActivo');
    window.location.href = 'login.html';
});

window.onload = () => {
    cargarCatalogo();
    actualizarTablaHistorial();
};