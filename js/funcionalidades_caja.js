// 1. EL MENÚ DE PRODUCTOS
// Aquí anotamos todo lo que vendemos con su precio, un color para el botón y su categoría.
const productos = [
    { id: 1, nombre: "Empanada", precio: 2.50, color: "#f2c811", cat: "comida" },
    { id: 2, nombre: "Café", precio: 1.50, color: "#6f4e37", cat: "bebida" },
    { id: 3, nombre: "Jugo", precio: 2.00, color: "#ff8c00", cat: "bebida" },
    { id: 4, nombre: "Sandwich", precio: 4.50, color: "#8b4513", cat: "comida" },
    { id: 5, nombre: "Postre", precio: 3.00, color: "#db7093", cat: "comida" }
];

// 2. LA LISTA DE LA COMPRA (VENTA ACTUAL)
// Es una caja vacía donde iremos metiendo los productos que el cliente pida.
let ventaActual = [];

/*
    3. DIBUJAR LOS BOTONES (mostrarProductos)
    Esta función llena la pantalla con los botones de los productos.
    - Si eliges una categoría (como "bebidas"), solo muestra esas.
    - Crea cada botón con su color lateral y le pone el precio.
*/
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
        // Cuando haces clic, se añade a la cuenta.
        boton.onclick = () => agregarALaVenta(p.id);
        cuadricula.appendChild(boton);
    });
}

/*
    4. EL FILTRADO POR PESTAÑAS (filtrarProductos)
    Sirve para cambiar entre "Comida", "Bebidas" o "Todos" arriba en el menú.
    Marca la pestaña como "activa" para que sepa cuál pulsaste.
*/
function filtrarProductos(cat) {
    document.querySelectorAll('.pestana').forEach(p => p.classList.remove('activa'));
    event.currentTarget.classList.add('activa');
    mostrarProductos(cat);
}

/*
    5. AÑADIR A LA CUENTA (agregarALaVenta)
    Cuando tocas un producto:
    - Si ya estaba en la lista, solo le suma 1 a la cantidad.
    - Si es nuevo lo mete en la lista con cantidad 1.
*/
function agregarALaVenta(id) {
    const producto = productos.find(p => p.id === id);
    const itemEnVenta = ventaActual.find(item => item.id === id);
    
    if (itemEnVenta) {
        itemEnVenta.cantidad++;
    } else {
        ventaActual.push({ ...producto, cantidad: 1 });
    }
    actualizarTabla(); // Refresca la factura visual.
}

/*
    6. QUITAR O RESTAR (quitarProducto)
    como su nombre dice quita o borra XD
    - Si tiene varios, le resta uno.
    - Si solo quedaba uno, lo borra por completo de la lista.
*/
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

/*
    7. RECALCULAR FACTURA (actualizarTabla)
    Esta es la parte que más trabaja. 
    Limpia la tabla de la factura y la vuelve a escribir.
    Va sumando los precios para dar el total final abajo.
*/
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

/*
    8. COBRAR (emitirRecibo)
    Verifica que no estés intentando cobrar una cuenta vacía.
    Si todo está bien, lanza el aviso de éxito y limpia todo para el siguiente cliente.
*/
function emitirRecibo() {
    if (ventaActual.length === 0) {
        alert(" Error: No hay productos en la lista.");
        return;
    }
    alert(" Recibo Emitido\n¡Gracias por su compra!");
    ventaActual = [];
    actualizarTabla();
}

/*
    9. AL CARGAR LA PÁGINA (window.onload)
    Prepara todo apenas entras:
    - Muestra todos los productos.
    - Pone la fecha del día automáticamente.
    - Pone el nombre del cajero que inició sesión (lo saca del Login anterior).
*/
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