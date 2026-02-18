/* --- BASE DE DATOS DE PRODUCTOS --- */
const productos = [
    { id: 1, nombre: "Empanada", precio: 2.50, color: "#f2c811", cat: "comida" },
    { id: 2, nombre: "Café", precio: 1.50, color: "#6f4e37", cat: "bebida" },
    { id: 3, nombre: "Jugo", precio: 2.00, color: "#ff8c00", cat: "bebida" },
    { id: 4, nombre: "Sandwich", precio: 4.50, color: "#8b4513", cat: "comida" },
    { id: 5, nombre: "Postre", precio: 3.00, color: "#db7093", cat: "comida" }
];

let ventaActual = [];

/* --- RENDERIZADO DE PRODUCTOS --- */
function mostrarProductos(categoria = 'todos') {
    const grid = document.getElementById('pos-grid');
    if (!grid) return;
    grid.innerHTML = ''; 

    const filtrados = categoria === 'todos' ? productos : productos.filter(p => p.cat === categoria);

    filtrados.forEach(p => {
        const btn = document.createElement('div');
        btn.className = 'pos-button';
        btn.style.borderLeft = `8px solid ${p.color}`;
        btn.innerHTML = `<strong>${p.nombre}</strong><span>$${p.precio.toFixed(2)}</span>`;
        btn.onclick = () => agregarALaVenta(p.id);
        grid.appendChild(btn);
    });
}

function filtrarProductos(cat) {
    document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    mostrarProductos(cat);
}

/* --- LÓGICA DE VENTA --- */

function agregarALaVenta(id) {
    const producto = productos.find(p => p.id === id);
    const itemEnVenta = ventaActual.find(item => item.id === id);
    
    if (itemEnVenta) {
        itemEnVenta.cantidad++;
    } else {
        ventaActual.push({ ...producto, cantidad: 1 });
    }
    actualizarTabla(); // <--- IMPORTANTE: Llamamos a la función que tiene el botón
}

function quitarProducto(id) {
    const itemIndex = ventaActual.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        if (ventaActual[itemIndex].cantidad > 1) {
            ventaActual[itemIndex].cantidad--;
        } else {
            ventaActual.splice(itemIndex, 1);
        }
    }
    actualizarTabla(); 
}

// Esta es la única función que debe dibujar la tabla
function actualizarTabla() {
    const body = document.getElementById('bill-items');
    const totalTxt = document.getElementById('pos-total');
    if (!body || !totalTxt) return;

    body.innerHTML = ""; 
    let total = 0;

    ventaActual.forEach(item => {
        const subtotalItem = item.precio * item.cantidad;
        total += subtotalItem;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>$${subtotalItem.toFixed(2)}</td>
            <td>
                <button class="btn-del" onclick="quitarProducto(${item.id})">✖</button>
            </td>
        `;
        body.appendChild(row);
    });
    totalTxt.innerText = `$${total.toFixed(2)}`;
}

function emitirRecibo() {
    if (ventaActual.length === 0) {
        alert("⚠️ Error: No hay productos en la lista.");
        return;
    }
    alert("📄 Recibo Emitido\n¡Gracias por su compra!");
    ventaActual = [];
    actualizarTabla();
}

window.onload = () => {
    mostrarProductos('todos');
    const user = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (user && document.getElementById('nombre-cajero')) {
        document.getElementById('nombre-cajero').innerText = user.user;
    }
};