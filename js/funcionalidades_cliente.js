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

function toggleCarrito() {
    const drawer = document.getElementById('carrito_drawer');
    const overlay = document.getElementById('carrito_overlay');
    drawer.classList.toggle('active');
    overlay.style.display = drawer.classList.contains('active') ? 'block' : 'none';
}

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
    const lista = document.getElementById('items_carrito');
    const conteo = document.getElementById('conteo_carrito');
    const conteoF = document.getElementById('conteo_flotante');
    const totalS = document.getElementById('total_carrito');
    
    lista.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="mensaje_vacio">Carrito vacío</p>';
    } else {
        carrito.forEach((item, i) => {
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.marginBottom = '10px';
            div.innerHTML = `
                <span>${item.nombre}</span>
                <div>
                    <span>$${item.precio.toFixed(2)}</span>
                    <button onclick="eliminarDelCarrito(${i})" style="border:none; background:none; cursor:pointer;">🗑️</button>
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

function finalizarPedido() {
    if (carrito.length === 0) return alert("Carrito vacío");

    const nuevaCompra = {
        fecha: new Date().toLocaleDateString(),
        detalles: carrito.map(p => p.nombre).join(", "),
        total: document.getElementById('total_carrito').innerText
    };

    historialCompras.push(nuevaCompra);
    carrito = [];
    actualizarInterfazCarrito();
    actualizarTablaHistorial();
    toggleCarrito();
    alert("¡Pedido finalizado!");
}

function actualizarTablaHistorial() {
    const cuerpo = document.getElementById('cuerpo_historial');
    cuerpo.innerHTML = '';
    [...historialCompras].reverse().forEach(c => {
        cuerpo.innerHTML += `<tr><td>${c.fecha}</td><td>${c.detalles}</td><td>${c.total}</td></tr>`;
    });
}

window.onload = () => {
    cargarCatalogo();
    actualizarTablaHistorial();
};