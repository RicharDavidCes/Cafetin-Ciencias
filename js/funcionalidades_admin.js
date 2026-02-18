let menuAdmin = [
    { id: 1, nombre: "Empanada de Queso", precio: 2.50, tipo: "Producto" },
    { id: 2, nombre: "Café con Leche", precio: 1.50, tipo: "Producto" },
    { id: 3, nombre: "Sandwich Club", precio: 4.00, tipo: "Producto" }
];

let resenasAdmin = [
    { id: 101, nombre: "JuanPerez_UCV", info: "¡Las mejores empanadas de la facultad!", tipo: "Reseña" },
    { id: 102, nombre: "MariaCiencias", info: "El café estaba un poco frío hoy.", tipo: "Reseña" }
];

let vistaActual = 'Producto'; // Por defecto vemos el menú

function renderizarGestion() {
    const tableBody = document.getElementById('admin-items-body');
    tableBody.innerHTML = '';

    // Decidimos qué array mostrar según la vista actual
    const datosAMostrar = (vistaActual === 'Producto') ? menuAdmin : resenasAdmin;

    datosAMostrar.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.nombre}</strong></td>
            <td><span class="badge ${item.tipo.toLowerCase()}">${item.tipo}</span></td>
            <td>${item.tipo === 'Producto' ? '$' + item.precio.toFixed(2) : item.info}</td>
            <td>
                <button class="btn-delete-admin" onclick="eliminarItem(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function cambiarVistaAdmin(tipo) {
    vistaActual = tipo;
    
    // Cambiar estado visual de los botones
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if(tipo === 'Producto') document.getElementById('tab-productos').classList.add('active');
    else document.getElementById('tab-resenas').classList.add('active');

    renderizarGestion();
}

function eliminarItem(index) {
    if(confirm(`¿Seguro que deseas eliminar esta ${vistaActual}?`)) {
        if(vistaActual === 'Producto') menuAdmin.splice(index, 1);
        else resenasAdmin.splice(index, 1);
        renderizarGestion();
    }
}

// El formulario de agregar producto siempre nos lleva a la vista de productos
document.getElementById('form-producto').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('admin-nombre').value;
    const precio = parseFloat(document.getElementById('admin-precio').value);
    
    menuAdmin.push({ id: Date.now(), nombre: nombre, precio: precio, tipo: "Producto" });
    
    this.reset();
    cambiarVistaAdmin('Producto'); // Refrescar y mostrar la lista de productos
    alert("Producto agregado correctamente.");
});

window.onload = renderizarGestion;