const productos = [
    { id: 1, nombre: "Empanada", precio: 2.50, color: "#f2c811", cat: "comida" },
    { id: 2, nombre: "Café", precio: 1.50, color: "#6f4e37", cat: "bebida" },
    { id: 3, nombre: "Jugo", precio: 2.00, color: "#ff8c00", cat: "bebida" },
    { id: 4, nombre: "Sandwich", precio: 4.50, color: "#8b4513", cat: "comida" },
    { id: 5, nombre: "Postre", precio: 3.00, color: "#db7093", cat: "comida" }
];

let ventaActual = [];

function mostrarProductos(categoria = 'todos') {
    const cuadricula = document.getElementById('cuadricula_pos');
    if (!cuadricula) return;
    cuadricula.innerHTML = ''; 

    const filtrados = categoria === 'todos' ? productos : productos.filter(p => p.cat === categoria);

    filtrados.forEach(p => {
        const boton = document.createElement('div');
        boton.className = 'boton_pos';
        boton.style.borderLeft = `8px solid ${p.color}`;
        boton.innerHTML = `<strong>${p.nombre}</strong><span>$${p.precio.toFixed(2)}</span>`;
        boton.onclick = () => agregarALaVenta(p.id);
        cuadricula.appendChild(boton);
    });
}

function filtrarProductos(cat) {
    document.querySelectorAll('.pestana').forEach(p => p.classList.remove('activa'));
    event.currentTarget.classList.add('activa');
    mostrarProductos(cat);
}

function agregarALaVenta(id) {
    const producto = productos.find(p => p.id === id);
    const itemEnVenta = ventaActual.find(item => item.id === id);
    
    if (itemEnVenta) {
        itemEnVenta.cantidad++;
    } else {
        ventaActual.push({ ...producto, cantidad: 1 });
    }
    actualizarTabla();
}

function quitarProducto(id) {
    const indice_item = ventaActual.findIndex(item => item.id === id);
    if (indice_item > -1) {
        if (ventaActual[indice_item].cantidad > 1) {
            ventaActual[indice_item].cantidad--;
        } else {
            ventaActual.splice(indice_item, 1);
        }
    }
    actualizarTabla(); 
}

function actualizarTabla() {
    const cuerpoFactura = document.getElementById('items_factura');
    const textoTotal = document.getElementById('total_pos');
    const subtotal_pos = document.getElementById('subtotal_pos');
    
    if (!cuerpoFactura || !textoTotal) return;

    cuerpoFactura.innerHTML = ""; 
    let total = 0;

    ventaActual.forEach(item => {
        const subtotalItem = item.precio * item.cantidad;
        total += subtotalItem;
        
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td class="txt_centro">${item.cantidad}</td>
            <td class="txt_derecha">$${subtotalItem.toFixed(2)}</td>
            <td class="txt_centro">
                <button class="boton_eliminar_item" onclick="quitarProducto(${item.id})">✖</button>
            </td>
        `;
        cuerpoFactura.appendChild(fila);
    });

    textoTotal.innerText = `$${total.toFixed(2)}`;
    if(subtotal_pos) subtotal_pos.innerText = `$${total.toFixed(2)}`;
}

function emitirRecibo() {
    if (ventaActual.length === 0) {
        alert(" Error: No hay productos en la lista.");
        return;
    }
    alert(" Recibo Emitido\n¡Gracias por su compra!");
    ventaActual = [];
    actualizarTabla();
}

window.onload = () => {
    mostrarProductos('todos');
    
    const fechaPos = document.getElementById('fecha_pos');
    if(fechaPos) {
        const d = new Date();
        fechaPos.innerText = d.toLocaleDateString();
    }

    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (usuario && document.getElementById('nombre_cajero')) {
        document.getElementById('nombre_cajero').innerText = usuario.user;
    }
};