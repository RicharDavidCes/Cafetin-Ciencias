let menuAdmin = [
    { id: 1, nombre: "Empanada de Queso", precio: 2.50, tipo: "Producto" },
    { id: 2, nombre: "Café con Leche", precio: 1.50, tipo: "Producto" },
    { id: 3, nombre: "Sandwich Club", precio: 4.00, tipo: "Producto" }
];

let resenasAdmin = [
    { id: 101, nombre: "JuanPerez_UCV", info: "¡Las mejores empanadas de la facultad!", tipo: "Reseña" },
    { id: 102, nombre: "MariaCiencias", info: "El café estaba un poco frío hoy.", tipo: "Reseña" }
];

let vistaActual = 'Producto';

function renderizarGestion() {
    const cuerpoTabla = document.getElementById('cuerpo_items_admin');
    cuerpoTabla.innerHTML = '';

    const datosAMostrar = (vistaActual === 'Producto') ? menuAdmin : resenasAdmin;

    datosAMostrar.forEach((item, indice) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>${item.nombre}</strong></td>
            <td><span class="distintivo ${item.tipo.toLowerCase()}">${item.tipo}</span></td>
            <td>${item.tipo === 'Producto' ? '$' + item.precio.toFixed(2) : item.info}</td>
            <td>
                <button class="boton_eliminar_admin" onclick="eliminarItem(${indice})">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

function cambiarVistaAdmin(tipo) {
    vistaActual = tipo;
    
    document.querySelectorAll('.boton_pestana').forEach(boton => boton.classList.remove('activa'));
    if(tipo === 'Producto') {
        document.getElementById('pestana_productos').classList.add('activa');
    } else {
        document.getElementById('pestana_resenas').classList.add('activa');
    }

    renderizarGestion();
}

function eliminarItem(indice) {
    if(confirm(`¿Seguro que deseas eliminar esta ${vistaActual}?`)) {
        if(vistaActual === 'Producto') {
            menuAdmin.splice(indice, 1);
        } else {
            resenasAdmin.splice(indice, 1);
        }
        renderizarGestion();
    }
}

document.getElementById('formulario_producto').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('admin_nombre').value;
    const precio = parseFloat(document.getElementById('admin_precio').value);
    
    menuAdmin.push({ id: Date.now(), nombre: nombre, precio: precio, tipo: "Producto" });
    
    this.reset();
    cambiarVistaAdmin('Producto');
    alert("Producto agregado correctamente.");
});

window.onload = renderizarGestion;